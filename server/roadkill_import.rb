
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
	
	def self.parse_date(raw)
		#2016-12-05T00:00:00Z
		pattern = /^(\d{4,4})[-](\d\d)[-](\d\d)T(\d\d)[:](\d\d)[:](\d\d)Z$/
		bits = pattern.match(raw)[1..6]
		bits << 0
		Time.new(*bits)
	end

	class RoadKillRecord 
		attr_reader :id, :nonce, :description, :timestamp, :address, :geocoord
		
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
		end

		def export()
			{
				:id => @id,
				:nonce => @nonce,
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
					f.puts JSON.dump(r.export)
				end
				f.puts ']}'
			end
			@validator.set_threshold(track_update)
		end
	end

end

$remote_api = "https://data.cincinnati-oh.gov/api/views/wdw5-d4i2/rows.json?accessType=DOWNLOAD"

puts "begin import from remote data source"
importer = RoadkillImport::JsonExportFetch.new($remote_api)
roadkill_records = importer.fetch()
puts "parsed #{roadkill_records.size} records"

puts "begin export to application database"
exporter = RoadkillImport::FileExport.new("./dump.json",RoadkillImport::ExportValidator.new)
exporter.export(roadkill_records)
puts "export complete"
