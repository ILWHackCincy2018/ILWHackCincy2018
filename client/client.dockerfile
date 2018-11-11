FROM nginx:1.13.3-alpine

EXPOSE 443

RUN rm -rf /usr/share/nginx/html/*
#COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/my-app/ /usr/share/nginx/html
RUN chmod -R 0755 /usr/share/nginx/html/*

CMD ["nginx", "-g", "daemon off;"]
