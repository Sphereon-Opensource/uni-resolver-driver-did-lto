# Dockerfile for sphereon/uni-resolver-driver-did-lto

FROM node:14-alpine
MAINTAINER Sphereon <dev@sphereon.com>


# Default testnet node
ENV NODE1_ENABLED true
ENV NODE1_NETWORK_ID testnet
ENV NODE1_LTO_URL https://lto-indexer-test.test.sphereon.io
# Future permanent public URL
#ENV NODE1_LTO_URL https://testnet.lto.network/indexer

# Default mainnet node
ENV NODE2_ENABLED true
ENV NODE2_NETWORK_ID mainnet
ENV NODE2_LTO_URL https://lto-indexer-test.test.sphereon.io
# Future permanent public URL
#ENV NODE2_LTO_URL https://nodes.lto.network/indexer

# build driver-did-lto

WORKDIR /lto/universal-resolver
COPY package.json ./
RUN npm install
COPY . .

# done

EXPOSE 8080

CMD [ "npm", "start" ]
