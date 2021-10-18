FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps usr/src/app/node_modules ./node_modules
RUN npm build

FROM node:14-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# COPY --FROM=builder /usr/src/app/public ./public
COPY --from=builder usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs usr/src/app/.next ./.next
COPY --from=builder usr/src/app/node_modules ./node_modules
COPY --from=builder usr/src/app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]