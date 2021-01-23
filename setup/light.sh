#!/bin/bash
# Usage: Join main blockchain network as light node
# Author: Nicolas Duchemann
# -------------------------------------------------

# apt-get -y install supervisor
# service supervisor start


# touch /etc/supervisor/conf.d/node.conf
# echo "[program:node]
# command=
# autostart=true
# autorestart=true
# stderr_logfile=/root/nodeerr.log
# stdout_logfile=/root/nodelog.log" >> /etc/supervisor/conf.d/node.conf


# supervisorctl reread
# supervisorctl update

geth  --datadir /datadir/ --syncmode='light' --port 30311 --rpc --rpcaddr '0.0.0.0' --rpcport 8501 --rpccorsdomain=* --ws --wsaddr 0.0.0.0 --wsorigins=* --wsapi "admin,debug,eth,miner,net,personal,shh,txpool,web3" --rpcapi 'personal,db,eth,net,web3,txpool,miner,admin,clique' --nousb