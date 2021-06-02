![DIF Logo](https://raw.githubusercontent.com/decentralized-identity/universal-resolver/master/docs/logo-dif.png)

# Universal Resolver Driver: did:lto

This is an [Universal Resolver](https://github.com/decentralized-identity/universal-resolver/) driver for **did:lto** identifiers.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)

## Example DID

```
did:lto:3JuijVBB7NCwCz2Ae5HhCDsqCXzeBLRTyeL
```

## Running the container and configuration
You can run the container using the docker command or using the docker-compose command. 
In either case there are several environment variables to configure runtime parameters

### Environment variables
TODO

#### NODE<X>_NETWORK_ID
Defines the network Id (name). There can only be one network ID per driver instance. If loadbalancing/HA is needed that is the responsibility of the node itself. 
^ is this applicable?

The network name can be supplied as part of the DID, eg for testnet.
````
did:lto:testnet:3JuijVBB7NCwCz2Ae5HhCDsqCXzeBLRTyeL
````
The <network_id> part in the did:factom:<network_id>:<chain_id> is completely optional. Default mainnet and testnet can be used for the respective networks. "mainnet" is the default when no network is supplied in the DID. For public mainnet the whole :<network_id> part in the DID would be committed., eg:
````
did:lto:3JuijVBB7NCwCz2Ae5HhCDsqCXzeBLRTyeL
````


## Build and Run (Docker)

```
docker build -f ./docker/Dockerfile . -t exampleorg/uni-resolver-driver-did-lto
docker run -p 8080:8080 exampleorg/uni-resolver-driver-did-lto
curl -X GET http://localhost:8080/1.0/identifiers/did:lto:3JuijVBB7NCwCz2Ae5HhCDsqCXzeBLRTyeL
```

## Build and Run (NodeJS)

```
npm start
```

## Run tests (NodeJS)

For running the tests node 13.6.0 or higher is required.

```
npm run test
```
