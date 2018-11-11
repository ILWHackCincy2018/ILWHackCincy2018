#!/usr/bin/env ruby

Version = '1.0.0'
ImageName = "ilwllc/hackcincy2018:#{Version}"
Command = "docker image build -t #{ImageName} -f dockerfile ."

puts "EXEC: #{Command}"
system(Command)

