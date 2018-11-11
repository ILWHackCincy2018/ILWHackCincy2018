# ILWHackCincy2018
ILW Submission for Hack Cincy 2018
MeatUP: Because no meat should go to waste.

## Contributors:
* Anthony Whitaker
* Michael Buda
* Nathen Lyman
* Liberty Wollerman
* Matt Beischel

## WTF is it:
An app which facilitates cooking competitions centered around the grand old tradition of scavenging fresh road kill.
You can set up a 'Roadkill Recipe Raid', other human-vultures join in, 
spend the day happily scraping dogs, cats, deer, and more off of the freeway, and then everyone votes on the
best dish cooked from the found culinary treasures.

## How it is built, and how to deploy & run it.
The app is broken into 3 distinct components:
* The client is pure Angular.io application
* The database is Google's Firebase application platform
* The importer is a stand-alone agent based in Ruby, which scrapes the roadkill data set from
  Cincy Open Data.

The importer is justified to alleviate the burden on the client to appropriately sanitize the content
from Cincy Open Data for storage in Firebase.

The client & importer are both distributable as standalone docker images,
to build the docker images from scratch simply run the build_docker.rb script in the appropriate sub-folder.

The client is accessible as a basic static content web application, simply put on a server and access.
The importer is executed from the command line, with the default 'loop_server.rb' script it will run continuosly
until halted, and provides data updates approximatly every 10 minutes, synced to the current clock.



