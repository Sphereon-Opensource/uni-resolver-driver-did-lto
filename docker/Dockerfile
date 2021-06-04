# Dockerfile for sphereon/driver-did-lto

FROM node:10
MAINTAINER Sphereon <dev@sphereon.com>

# Default mainnet node
ENV NODE1_ENABLED true
ENV NODE1_NETWORK_ID mainnet
ENV NODE1_LTO_URL https://lto.network

# Default testnet node
ENV NODE2_ENABLED true
ENV NODE2_NETWORK_ID testnet
ENV NODE2_LTO_URL https://testnet.lto.network

# build driver-did-lto

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

# done

EXPOSE 8080

CMD [ "node", "index.js" ]
