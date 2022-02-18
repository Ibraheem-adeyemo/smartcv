# rm -rf pages/api/*

npm config set proxy http://172.25.20.117:80

npm install

npm install --save-dev typescript
npm install --save-dev @types/react
npm install --save-dev @types/node
npm install --save-dev eslint
npm install --save-dev eslint-config-next


npm run build

docker-compose up -d

docker-compose push paasui