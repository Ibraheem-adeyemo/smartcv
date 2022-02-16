FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./

ARG http_proxy
ARG https_proxy

ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}

RUN npm --proxy=${http_proxy} install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG http_proxy
ENV http_proxy ${http_proxy

ARG http_proxy
ENV https_proxy ${https_proxy}

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN echo ${NODE_ENV}

ARG NEXT_PUBLIC_PASSPORT_TOKEN_URL
ENV NEXT_PUBLIC_PASSPORT_TOKEN_URL ${NEXT_PUBLIC_PASSPORT_TOKEN_URL}

ARG NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_CLIENT_ID ${NEXT_PUBLIC_CLIENT_ID}

ARG NEXT_PUBLIC_SECRET
ENV NEXT_PUBLIC_SECRET ${NEXT_PUBLIC_SECRET}

ARG NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_REDIRECT_URI ${NEXT_PUBLIC_REDIRECT_URI}

ARG NEXT_PUBLIC_PASSPORT_AUTHORIZE_URL
ENV NEXT_PUBLIC_PASSPORT_AUTHORIZE_URL ${NEXT_PUBLIC_PASSPORT_AUTHORIZE_URL}

ARG NEXT_PUBLIC_RESPONSE_TYPE
ENV NEXT_PUBLIC_RESPONSE_TYPE ${NEXT_PUBLIC_RESPONSE_TYPE}

ARG NEXT_PUBLIC_SCOPE
ENV NEXT_PUBLIC_SCOPE ${NEXT_PUBLIC_SCOPE}

ARG NEXT_PUBLIC_PASSPORT_PROFILE_URL
ENV NEXT_PUBLIC_PASSPORT_PROFILE_URL ${NEXT_PUBLIC_PASSPORT_PROFILE_URL}

ARG NEXT_PUBLIC_CURRENT_API_VERSION
ENV NEXT_PUBLIC_CURRENT_API_VERSION ${NEXT_PUBLIC_CURRENT_API_VERSION}

ARG NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE
ENV NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE ${NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE}

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL ${NEXT_PUBLIC_API_BASE_URL}

ARG NEXT_PUBLIC_ALLOWED_APPS
ENV NEXT_PUBLIC_ALLOWED_APPS ${NEXT_PUBLIC_ALLOWED_APPS}

# Build the project and copy the files
RUN npm run build
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

FROM nginx:alpine

#!/bin/sh

COPY ./public/.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /opt/app/out /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]