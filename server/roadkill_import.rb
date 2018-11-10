
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
		#TODO: actually parse date
		raw
	end

	class RoadKillRecord 
		attr_reader :id, :nonce, :description, :timestamp, :address, :geocoord
		
		def self.valid_json?(raw_json)
			raw_json["data"] ? true : false
		end
		
		def self.parse(raw_json)
			raw_json["data"].map do |raw|
				RoadKillRecord .new(
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
				#TODO
				:timestamp => @timestamp,
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
			@remote = remote
		end
		
		def fetch()
			result = Net::HTTP.get_response(@remote)
			handleError("???", nil) if result.nil?
			handleError("???", result.body) if result.code.nil?
			if (result.code.to_i / 100) != 2
				handleError(result.code.to_i, result.body)
			end
			unless RoadKillRecord.valid_json?(result.body)
				handleError(422, "Response not formatted as expected")
			end
			RoadKillRecord.parse(JSON.parse(result.body))
		end
	
		def handle_error(response_code, error_body)
			$stdin.puts "#{@remote} => #{response_code}\n#{error_body}"
			raise FetchError.new("#{@remote} => #{response_code}")
		end
	end
	
	class ExportValidator
		def valid?(record)
			#TODO
			true
		end
	end
	
	class FileExport
		def initialize(file, validator)
			@file = file
			@validator = validator
		end
		
		def export(records)
			add_comma = false
			File.open(@file, 'w+') do |f|
				f.puts '{"data":['
				records.each do |r| 
					next unless @validator.valid?(r)
					f.puts ',' if add_comma 
					add_comma = true unless add_comma
					f.puts JSON.dump(r.export)
				end
				f.puts ']}'
			end
		end
	end

end

#TODO: bind in actual fetcher 
json_file = File.read("./data-dump.json")
#json_file = '{"data": []}'
raw_json = JSON.parse(json_file)
puts "!!! check valid json #{RoadkillImport::RoadKillRecord.valid_json?(raw_json)}"
roadkill_records = RoadkillImport::RoadKillRecord.parse(raw_json)

exporter = RoadkillImport::FileExport.new("./dump.json",RoadkillImport::ExportValidator.new)
exporter.export(roadkill_records)

