# privateKeyFinder




## Build the blockchain docker image :

cd setup
docker build -t nicoduch/blockchain .

## Run image :


docker run -it -p 8501:8501 -v /datadir:/datadir nicoduch/blockchain
