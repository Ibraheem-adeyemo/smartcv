# rm -rf pages/api/*

npm config set proxy http://172.25.20.117:80

npm install --save-dev typescript@4.4.3
npm install --save-dev @types/react@17.0.27
npm install --save-dev @types/node
npm install --save-dev eslint@7.32.0
npm install --save-dev eslint-config-next@7.32.0

npm install

docker-compose up -d

docker-compose push paasui