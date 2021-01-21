#!/bin/bash
# Usage: Join main blockchain network as light node
# Author: Nicolas Duchemann
# -------------------------------------------------

geth --datadir ./datadir/ --syncmode='light' --port 30311 --rpc --rpcaddr '0.0.0.0' --rpcport 8501 --rpcapi 'personal,eth,net,web3,txpool' --nousb


