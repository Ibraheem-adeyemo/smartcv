FROM nginx:alpine

#!/bin/sh

ARG http_proxy
ENV http_proxy ${http_proxy}

ARG http_proxy
ENV https_proxy ${https_proxy}

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

COPY ./public/.nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY ./out /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]