
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
docker build --no-cache -t redlabteam/private-key-finder .
```


```bash 
cd blockchain-master
docker build --no-cache -t redlabteam/blockchain-master .
cd ..
```

## Get the images :

```bash
docker pull redlabteam/private-key-finder
docker-pull redlabteam/blockchain-master
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


## Push images :

```bash
docker push redlabteam/blockchain
docker push redlabteam/private-key-finder
docker push redlabteam/master-api
```

## Balance checker


The balance checker takes several parameters:

Example: 
```bash
bash check_balance.bash --ipc --folder "/home/hduser/Desktop/privateKeyFinder/keys/*"  --jackpot jackpot.txt

# OR

bash check_balance.bash --ipc --file ../keys/addresses-2021-02-01-18-23.txt  --jackpot jackpot.txt
```

- ``--ipc``: inform that we use IPC to contact the blockchain. ws and http not handled by the script
- ``--folder`` : specify the folder in which the files are.
- `--file` if only one file should be checked, specify it with this flag. WARNING: --folder and --file cannot work together
- `--jackpot`: specify the jackpot file

### Behavior

The files containing the addresses are deleted after they are checked.

The bulk result file is deleted after a file a analysed.


## Find where keys are stocked on kubernetes cluster :

find / -xdev 2>/dev/null -name "generators"

/var/lib/docker/overlay2/be96bd9b3166a858dcfb0e9c87b790d8559c87cda905aca63297569e455f1574/diff/master-api/generators



## Full clean :

docker rm -f $(docker ps -qa)
docker volume rm $(docker volume ls -q)
cleanupdirs="/var/lib/etcd /etc/kubernetes /etc/cni /opt/cni /var/lib/cni /var/run/calico /opt/rke /mnt/data /mnt/data-keycloak"
for dir in $cleanupdirs; do
  echo "Removing $dir"
  rm -rf $dir
done

