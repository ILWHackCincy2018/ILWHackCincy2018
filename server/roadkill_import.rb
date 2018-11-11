
require 'net/http'
require 'json'

module RoadkillImport

	class FetchError < StandardError
		
	end
	
	class GeoCoordinate
		attr_reader :latitude, :longitude		
		def initialize(lat, lon)
			@latitude, @longitude = lat, lon
		end
	end

	def self.animal_types()
		return @animal_types if @animal_types
		$stdout.puts "reload animal types"
		@animal_types = []
		File.open('./animal_types.list') do |f|
		f.each do |line|
			next if line.strip.empty?
			@animal_types << line.strip
		end end
		@animal_types
	end
	
	def self.parse_date(raw)
		#2016-12-05T00:00:00Z
		pattern = /^(\d{4,4})[-](\d\d)[-](\d\d)T(\d\d)[:](\d\d)[:](\d\d)Z$/
		bits = pattern.match(raw)[1..6]
		bits << 0
		Time.new(*bits)
	end

	class RoadKillRecord 
		attr_reader :id, :nonce
		attr_reader :description, :timestamp, :animal_type
		attr_reader :address, :geocoord
		
		def self.valid_json?(raw_json)
			raw_json["data"].is_a?(Array)
		end
		
		def self.parse(raw_json)
			raw_json["data"].map do |raw|
				RoadKillRecord.new(
					raw[1], raw[5],
					raw[10], raw[11],
					raw[12], raw[13], raw[14]
				)
			end
		end
		
		def initialize(id,nonce,desc, ts, address, lat, lon) 
			@id, @description, @address = id, desc, address 
			@nonce = nonce.to_i
			@timestamp = RoadkillImport.parse_date(ts)
			@geocoord = GeoCoordinate.new(lat, lon)

			RoadkillImport.animal_types.each do |animal_type|
				next unless desc =~ /^.*#{animal_type}.*$/i
				@animal_type = animal_type
				break
			end
		end

		def export()
			{
				:id => @id,
				:species => @animal_type,
				:description => @description,
				:timestamp => @timestamp.to_s,
				:address => @address,
				:geocoord => {
					:latitude => @geocoord.latitude,
					:longitude => @geocoord.longitude
				},
			}
		end
	end
	
	class JsonExportFetch
		def initialize(remote)
			@remote = URI.parse(remote)
		end
		
		def fetch()
			self.log('start fetch')
			result = Net::HTTP.get_response(@remote)

			self.log('check for basic errors')
			handle_error("???", nil) if result.nil?
			handle_error("???", result.body) if result.code.nil?
			if (result.code.to_i / 100) != 2
				handle_error(result.code.to_i, result.body)
			end
			
			self.log('parse response as JSON')
			raw_json = nil
			begin
				raw_json = JSON.parse(result.body)
			rescue Exception => e
				handle_error(422, result.body, e)
			end

			self.log('check JSON has valid structure')
			unless RoadKillRecord.valid_json?(raw_json)
				handle_error(422, result.body)
			end

			self.log('parse & return records')
			ret = []
			begin
				ret = RoadKillRecord.parse(raw_json)
			rescue Exception => e
				handle_error(422, result.body, e)
			end
			ret
		end

		def log(message)
			$stdout.puts "FETCH[#{Time.now}]: #{message}"
		end
	
		def handle_error(response_code, error_body, exception = nil)
			self.log("ERROR! #{@remote} => #{response_code}")
			self.log(exception.to_s) if exception
			
			unless error_body.nil?
				error_file = "./error-#{Time.now}.json"
				self.log("dumping response body to #{error_file}")
				File.write(error_file, error_body, :mode => 'w+')
			end

			raise FetchError.new("#{@remote} => #{response_code}")
		end
	end
	
	class ExportValidator
		DataFile = './last.timestamp'
		RoadKillTooOld = 60 * 60 * 24 * 7

		def sync()
			@last_update = 0
			return unless File.exist?(DataFile)
			@last_update = File.read(DataFile).to_i
		end

		def set_threshold(stamp)
			File.write(DataFile, stamp.to_s, :mode => 'w+')
		end
		
		def valid?(record)
			return false if record.nonce < @last_update
			delta = Time.now - record.timestamp
			return false if delta > RoadKillTooOld
			true
		end
	end
	
	class FileExport
		def initialize(file, validator)
			@file = file
			@validator = validator
		end

		def pickle(r)
			{
				:id => r.id,
				:species => r.animal_type,
				:description => r.description,
				:timestamp => r.timestamp.to_s,
				:address => r.address,
				:geocoord => {
					:latitude => r.geocoord.latitude,
					:longitude => r.geocoord.longitude
				},
			}
		end

		def export(records)
			track_update = 0
			@validator.sync
			add_comma = false
			File.open(@file, 'w+') do |f|
				f.puts '{"data":['
				records.each do |r| 
					track_update = r.nonce if r.nonce > track_update
					next unless @validator.valid?(r)
					f.puts ',' if add_comma 
					add_comma = true unless add_comma
					f.puts JSON.dump(pickle(r))
				end
				f.puts ']}'
			end
			@validator.set_threshold(track_update)
		end
	end

	class FirebaseExport
		RemoteUrl = 'https://firestore.googleapis.com/v1beta1/projects'
		TimeFormat = '%Y-%m-%dT%H:%M:%SZ'

		def pickle(r)
			{:fields => {
				:species => {:stringValue => r.animal_type.to_s},
				:description => {:stringValue => r.description.to_s},
				:timestamp => {:timestampValue => r.timestamp.strftime(TimeFormat)},
				:address => {:stringValue => r.address.to_s},
				:geocoord => {:geoPointValue => {
					:latitude => r.geocoord.latitude.to_f,
					:longitude => r.geocoord.longitude.to_f
				}},
			}}
		end
	
		def initialize(project, collection, validator)
			@project = project
			@collection = collection
			@finalized_remote = [
				RemoteUrl, 
				project, 
				'databases/(default)/documents', 
				collection,
			].join('/')
			@validator = validator
		end

		def export(records)
			track_update = 0
			@validator.sync
			records.each do |r|
				track_update = r.nonce if r.nonce > track_update
				next unless @validator.valid?(r)
				self.do_send(r)
			end
			@validator.set_threshold(track_update)
		end

		def do_send(r)
			uri = URI.parse("#{@finalized_remote}/#{r.id}")
			begin
				self.log("export record #{r.id}")
				request = Net::HTTP::Patch.new(uri)
				request.content_type = 'application/json'
				request.body = JSON.dump(pickle(r))
				response = Net::HTTP.start(
					uri.hostname,
					uri.port,
					:use_ssl => true
				) {|http| http.request(request) }
	
				self.log('check for basic errors')
				handle_error(uri,"???", nil) if response.nil?
				handle_error(uri,"???", response.body) if response.code.nil?
				if (response.code.to_i / 100) != 2
					handle_error(uri,response.code.to_i, response.body)
				end
			rescue Exception => e
				handle_error(uri,"???",nil,e)
			end
		end

		def log(message)
			$stdout.puts "EXPORT[#{Time.now}]: #{message}"
		end
	
		def handle_error(uri,response_code, error_body = nil, exception = nil)
			self.log("ERROR! #{uri} => #{response_code}")
			self.log(error_body) if error_body
			self.log(exception.to_s) if exception
		end
	end

end

$remote_api = "https://data.cincinnati-oh.gov/api/views/wdw5-d4i2/rows.json?accessType=DOWNLOAD"

puts "begin import from remote data source"
importer = RoadkillImport::JsonExportFetch.new($remote_api)
roadkill_records = importer.fetch()
puts "parsed #{roadkill_records.size} records"

puts "begin export to application database"
#exporter = RoadkillImport::FileExport.new("./dump.json",RoadkillImport::ExportValidator.new)
exporter = RoadkillImport::FirebaseExport.new(
	"ilwhackcincy2018","RoadKill",
	RoadkillImport::ExportValidator.new
)

exporter.export(roadkill_records)
puts "export complete"
