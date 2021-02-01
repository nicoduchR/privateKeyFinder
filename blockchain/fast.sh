#!/bin/bash
# Usage: Join main blockchain network as light node
# Author: Nicolas Duchemann
# -------------------------------------------------

geth --unlock 95653b8B387e4c02517f6a5C88A35524066cd7C6 --password ./password.txt --allow-insecure-unlock  --datadir /datadir/ --syncmode='fast' --port 30311 --http --http.addr '0.0.0.0' --http.port 8501 --http.corsdomain=* --ws --ws.addr 0.0.0.0 --wsorigins=* --ws.api "admin,debug,eth,miner,net,personal,shh,txpool,web3" --http.api 'personal,db,eth,net,web3,txpool,miner,admin,clique' --nousb