# privateKeyFinder


## Build the blockchain docker image :

```bash 
docker build -t nicoduch/private-key-finder .


cd setup
docker build -t redlabteam/blockchain .

cd ..
```
## Get the images :

```bash
docker pull nicoduch/blockchain
docker pull nicoduch/private-key-finder
```

## Run image :


``docker-compose up -d blockchain``


Wait for the blockchain to be synced with the network


``docker-compose up -d node``
