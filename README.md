
    ______        _                _                  _   __                     ______  _             _             
    | ___ \      (_)              | |                | | / /                     |  ___|(_)           | |            
    | |_/ / _ __  _ __   __  __ _ | |_   ___  ______ | |/ /   ___  _   _  ______ | |_    _  _ __    __| |  ___  _ __ 
    |  __/ | '__|| |\ \ / / / _` || __| / _ \|______||    \  / _ \| | | ||______||  _|  | || '_ \  / _` | / _ \| '__|
    | |    | |   | | \ V / | (_| || |_ |  __/        | |\  \|  __/| |_| |        | |    | || | | || (_| ||  __/| |   
    \_|    |_|   |_|  \_/   \__,_| \__| \___|        \_| \_/ \___| \__, |        \_|    |_||_| |_| \__,_| \___||_|   
                                                                    __/ |                                            
                                                                   |___/                                             


# Build the docker images :

```bash 
docker build -t redlabteam/private-key-finder .
```

```bash 
cd blockchain
docker build -t redlabteam/blockchain .
cd ..
```

```bash 
cd master-api
docker build --no-cache -t redlabteam/master-api .
cd ..
```

## Get the images :

```bash
docker pull redlabteam/blockchain
docker pull redlabteam/private-key-finder
```

## Run images :

```bash
docker-compose up -d blockchain
```

Wait for the blockchain to be synced with the network ...


```bash
docker-compose up -d node
```

```bash
docker-compose up -d master
```
