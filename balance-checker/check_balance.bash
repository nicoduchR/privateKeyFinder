#!/bin/bash

contact_mode=""
addresses_file=""
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
    --http)
        contact_mode="http"
        echo "ERROR: NOT HANDLED"
        exit 1
        ;;
    --ws)
        contact_mode="ws"
        echo "ERROR: NOT HANDLED"
        exit 1
        ;;
    --ipc)
        contact_mode="ipc"
        ;;
    --file | -f)
        addresses_file="$2"
        shift
        ;;
    *)
        echo "ERROR - unknown flag -> $key <-"
        exit 1
        ;;
    esac
    shift
done

echo "INFO - contact mode is set to $contact_mode"
if [[ -z $addresses_file ]]; then
    echo "ERROR - addresses_file not provided"
    exit 1
fi
echo "INFO - addresses file is set to $addresses_file"

awk -f gen-bulk-ipc-query.awk $addresses_file | netcat -N -U /home/hduser/.ethereum/geth.ipc > bulk_results



