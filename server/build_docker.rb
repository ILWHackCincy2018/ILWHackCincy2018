#!/usr/bin/env ruby

ImageName = "ilwllc/hackcincy2018:importer"
Command = "docker image build -t #{ImageName} -f importer.dockerfile ."

puts "EXEC: #{Command}"
system(Command)

