![DIF Logo](https://raw.githubusercontent.com/decentralized-identity/universal-resolver/master/docs/logo-dif.png)

# Universal Resolver Driver: did:lto

This is an [Universal Resolver](https://github.com/decentralized-identity/universal-resolver/) driver for **did:lto** identifiers.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)

## Example DID

```
did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH
```

## Environment variables
TODO

## Network ID

The network name can be supplied as part of the DID, eg for testnet.
````
did:lto:testnet:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH
````
The <network_id> part in the did:lto:<network_id>:<chain_id> is completely optional. Default mainnet and testnet can be used for the respective networks. Mainnet is the default when no network is supplied in the DID. For public mainnet the whole :<network_id> part in the DID would be omitted., eg:
````
did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH
````


## Build and Run (Docker)
```
docker build -f ./docker/Dockerfile . -t sphereon/driver-did-lto
docker run -p 8080:8080 sphereon/driver-did-lto
curl -X GET http://localhost:8080/1.0/identifiers/did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH
```


## Build and Run (NodeJS)

```
npm start
```

## Run tests (NodeJS)

```
npm run test
```
