FROM ruby:2.4.3

RUN mkdir /var/opt/roadkill_import
COPY roadkill_import.rb /var/opt/roadkill_import/roadkill_import.rb
COPY animal_types.list /var/opt/roadkill_import/animal_types.list
COPY loop_server.rb /var/opt/roadkill_import/loop_server.rb
RUN chmod a+x /var/opt/roadkill_import/*.rb

CMD ["ruby", "/var/opt/roadkill_import/loop_server.rb"]
