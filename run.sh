#!/bin/bash

sudo docker stop es-demo
sudo docker rm es-demo

if [ ! -d ./node_modules ] ; then
  npm install
fi

# Initial build if not already built
if [ ! -d ./build ] ; then
  npm run-script build
fi

# Create self-signed SSL cert if not exist
if [ ! -f ./certificate.pem ]; then
  openssl req \
    -nodes \
    -new \
    -x509 \
    -keyout key.pem \
    -out certificate.pem
fi

sudo docker run \
  --name es-demo \
  -v $(pwd)/certificate.pem:/etc/nginx/certificate.pem:ro \
  -v $(pwd)/key.pem:/etc/nginx/key.pem \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $(pwd)/build:/app:ro \
  -v $(pwd)/logs:/logs \
  --net host \
  -d \
  nginx
