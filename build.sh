# rm -rf pages/api/*

# npm config set proxy http://172.25.20.117:6060

# npm --proxy $(https_proxy) install

# npm --proxy http://172.25.30.117:6060 install --save-dev typescript @types/react
# npm --proxy http://172.25.30.117:6060 install --save-dev typescript @types/node
# npm --proxy http://172.25.30.117:6060 install --save-dev eslint
# npm --proxy http://172.25.30.117:6060 install --save-dev eslint-config-next

docker-compose up -d

docker-compose push paasui