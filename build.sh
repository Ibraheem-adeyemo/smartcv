rm -rf pages/api

npm config set proxy http://172.25.20.117:6060

npm --proxy http://172.25.30.117:6060 install

npm --proxy http://172.25.30.117:6060 install --save-dev typescript @types/react
npm --proxy http://172.25.30.117:6060 install --save-dev typescript @types/node
npm --proxy http://172.25.30.117:6060 install --save-dev eslint