#!/bin/bash

npm install

# Initial build if not already built
if [ ! -f ./build ] ; then
  npm run-script build
fi

# Create self-signed SSL cert if not exist
if [ ! -f ./certificate.pem ]; then
  openssl req \
    -newkey rsa:2048 \
    -notes \
    -keyout key.pem \
    -x509 \
    -days 365 \
    -out certificate.pem
fi

sudo docker run \
  --name es-demo \
  -v ./nginx.conf:/etc/nginx/nginx.conf:ro \
  -v ./build:/app:ro \
  -v ./logs:/logs
  -P
  -d
  nginx
