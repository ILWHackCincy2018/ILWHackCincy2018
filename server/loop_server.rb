#!/usr/bin/env ruby

puts "!!! Starting Simple & Stupid Server."
puts Time.now.to_s



def clock_sync_point?()
	t = Time.now
	[0,5,10,15,20,25,30,35,40,45,50,55].include?(t.min) 
end

puts "sync to clock..."
until clock_sync_point?
	print '.'
	sleep(60)
end
puts "synced! #{Time.now.hour}:#{Time.now.min}"

puts "\n\n\n"

WorkingDirectory = File.realdirpath( File.dirname(__FILE__))
Dir.chdir(WorkingDirectory) do 
`rm -rf ./last.timestamp`
while true
	puts "!!! Executing Import @ #{Time.now}\n"
	system('./roadkill_import.rb')
	sleep(10 * 60)
end end
