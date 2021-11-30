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
Defines the network Id (name). There can only be one network ID per driver instance. If loadbalancing/HA is needed that is the responsibility of the node itself. The network name is part of the DID value and will automatically be extracted.

Example DID
````
did:lto:3N39xg4xauubonEWf2BUCp1DmGGQ3U21jJT
````

## Run tests (NodeJS)

```
npm run test
```

## Build and Run (Docker)
```
docker build -f ./Dockerfile . -t sphereon/uni-resolver-driver-did-lto
docker run -p 8080:8080 sphereon/uni-resolver-driver-did-lto

curl -X GET http://localhost:8080/1.0/identifiers/did:lto:3N39xg4xauubonEWf2BUCp1DmGGQ3U21jJT
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


