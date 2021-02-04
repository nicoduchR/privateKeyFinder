#!/bin/bash
# Usage: Join main blockchain network as light node
# Author: Nicolas Duchemann
# -------------------------------------------------

geth  --datadir /datadir/ --syncmode='light' --port 30311 --rpc --rpcaddr '0.0.0.0' --rpcport 8501 --rpccorsdomain=* --ws --wsaddr 0.0.0.0 --wsorigins=* --wsapi "admin,debug,eth,miner,net,personal,shh,txpool,web3" --rpcapi 'personal,db,eth,net,web3,txpool,miner,admin,clique' --nousb