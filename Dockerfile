FROM nginx
COPY index.html /usr/share/nginx/html/index.html
COPY js /usr/share/nginx/html/js
COPY css /usr/share/nginx/html/css
ENV LANG     C.UTF-8