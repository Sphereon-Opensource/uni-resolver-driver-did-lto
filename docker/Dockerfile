# Dockerfile for sphereon/driver-did-lto

FROM node:10
MAINTAINER Sphereon <dev@sphereon.com>

# build driver-did-lto

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

# done

EXPOSE 8080

CMD [ "node", "index.js" ]
