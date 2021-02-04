#!/bin/bash


geth --syncmode='light' --datadir=./datadir &

echo -e "*/2 * * * * cd /blockchain-master/balance-checker ; bash check_balance.bash --ipc --folder \"/blockchain-master/generators/*\" --ipc_file /blockchain-master/datadir/geth.ipc  --jackpot /blockchain-master/jackpot.txt > /blockchain-master/balance-log \n* * * * * bash /blockchain-master/geth_keep_alive.sh" | crontab -

sudo systemctl enable cron

sudo service cron start

npm i

node index.js




