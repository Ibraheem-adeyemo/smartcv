# rm -rf pages/api/*

# npm config set proxy http://172.25.20.117:6060

npm --proxy ${https_proxy} install

npm --proxy http://172.25.30.117:6060 install --save-dev typescript@4.4.3 @types/react@17.0.27
npm --proxy http://172.25.30.117:6060 install --save-dev @types/node
npm --proxy http://172.25.30.117:6060 install --save-dev eslint@7.32.0
npm --proxy http://172.25.30.117:6060 install --save-dev eslint-config-next@7.32.0

docker-compose up -d

docker-compose push paasui