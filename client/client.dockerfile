FROM nginx:1.12.2-alpine

EXPOSE 443

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html

