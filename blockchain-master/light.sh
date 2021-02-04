#!/bin/bash

geth --syncmode='light' &

npm i

node index.js

