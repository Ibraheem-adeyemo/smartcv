# rm -rf pages/api/*

npm config set proxy http://172.25.20.117:80

npm install
npm install --save-dev typescript
npm run build

docker-compose up -d

docker-compose push paasui