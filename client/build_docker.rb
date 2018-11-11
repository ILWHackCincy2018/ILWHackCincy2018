#!/usr/bin/env ruby

ImageName = "ilwllc/hackcincy2018:client"
Command = "docker image build -t #{ImageName} -f client.dockerfile ."

puts "EXEC: #{Command}"
system(Command)

