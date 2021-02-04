#!/bin/bash

geth_instances=$(ps -aux | grep "geth --syncmode" | grep -v grep)

if [[ -z $geth_instances ]]; then
    echo "WARNING: geth is down. Launching another instance"
    geth --syncmode='light' --datadir=./datadir &
else
    echo "INFO: geth is already running."
fi