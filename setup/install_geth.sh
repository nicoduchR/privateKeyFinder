#!/bin/bash

sudo updatedb

utils_script=$(locate privateKeyFinder/setup/utils.sh)

source $utils_script

log info "Installing Geth"
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
log info "Geth installation completed"