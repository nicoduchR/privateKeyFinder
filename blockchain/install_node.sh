#!/bin/bash

sudo updatedb

utils_script=$(locate privateKeyFinder/setup/utils.sh)

source $utils_script

log info "Installing nodejs v15.X"

curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

log info "Nodejs installed sucessfully"