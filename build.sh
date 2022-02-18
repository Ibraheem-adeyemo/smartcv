# rm -rf pages/api/*

# npm config set proxy http://172.25.20.117:6060

npm --proxy=http://172.25.20.117:6060 install --frozen-lockfile

npm run build

docker-compose up -d

docker-compose push paasui