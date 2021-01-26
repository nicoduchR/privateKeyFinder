#!/bin/bash

contact_mode=""
addresses_file=""
while [[ $# -gt 0 ]]; do
echo "$@"

    key="$1"
    case $key in
    --http)
        contact_mode="http"
        ;;
    --ws)
        contact_mode="ws"
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