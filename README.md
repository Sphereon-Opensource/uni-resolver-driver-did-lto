![DIF Logo](https://raw.githubusercontent.com/decentralized-identity/universal-resolver/master/docs/logo-dif.png)

# Universal Resolver Driver: did:lto

This is a [Universal Resolver](https://github.com/decentralized-identity/universal-resolver/) driver for **did:lto** identifiers.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)

## Example DID

```
did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH
```

### Environment variables
The universal resolver can connect to multiple networks and nodes. There are 9 of these slots available, and they can be configured using environment variables.
By default the public LTO mainnet and testnet are configured using the identity node. If you want to disable them, overwrite the values, or disable the slot. The 9 slots denoted by <X> are ranging from 1-9. 

#### NODE<X>_ENABLED
Enables or disables the node. eg true.

#### NODE<X>_LTO_URL
Defines the url to the LTO node. eg https://testnet.lto.network.

#### NODE<X>_NETWORK_ID
Defines the network Id (name). There can only be one network ID per driver instance. If loadbalancing/HA is needed that is the responsibility of the node itself. The network name can be supplied as part of the DID, eg for testnet.
````
did:lto:testnet:3N51gbw5W3xvSkcAXtLnXc3SQh2m9e6TBcy
````
The <network_id> part in the did:lto:<network_id>:<chain_id> is completely optional. Default mainnet and testnet can be used for the respective networks. Mainnet is the default when no network is supplied in the DID. For public mainnet the whole :<network_id> part in the DID would be omitted., eg:
````
did:lto:3N51gbw5W3xvSkcAXtLnXc3SQh2m9e6TBcy
````
Note: The above DID does not exist on mainnet, it only serves the purpose

## Run tests (NodeJS)

```
npm run test
```

## Build and Run (Docker)
```
docker build -f ./docker/Dockerfile . -t sphereon/uni-resolver-driver-did-lto
docker run -p 8080:8080 sphereon/uni-resolver-driver-did-lto

curl -X GET http://localhost:8080/1.0/identifiers/did:lto:testnet:3N51gbw5W3xvSkcAXtLnXc3SQh2m9e6TBcy
```

## Build and Run (NodeJS)

```
npm start
```

## API documentation

The API docs are also hosted. These can be found on the following URL once the driver is running.

```
http://localhost:8080/api-docs
```


