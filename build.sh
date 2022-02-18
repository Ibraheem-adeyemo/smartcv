# rm -rf pages/api/*

npm config set proxy http://172.25.20.117:80

npm --save-dev typescript@4.4.3 @types/react@17.0.27
npm --save-dev @types/node
npm --save-dev eslint@7.32.0
npm --save-dev eslint-config-next@7.32.0

npm install

docker-compose up -d

docker-compose push paasui