#!/bin/bash

docker stop es-demo || sudo docker stop es-demo
docker rm es-demo || sudo docker rm es-demo

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

docker run \
  --name es-demo \
  -v $(PWD)/certificate.pem:/etc/nginx/certificate.pem:ro \
  -v $(PWD)/key.pem:/etc/nginx/key.pem \
  -v $(PWD)/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $(PWD)/build:/app:ro \
  -v $(PWD)/logs:/logs \
  -p 443:443 \
  -d \
  nginx
