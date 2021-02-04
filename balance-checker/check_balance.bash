#!/bin/bash

echo "INFO - START"
process_file(){
    local addresses_file=$1
    echo "INFO - processing $addresses_file"

    awk -f gen-bulk-ipc-query.awk $addresses_file | netcat -N -U /home/hduser/.ethereum/geth.ipc > bulk_results

    sed -i 's/[{}"]//g' bulk_results

    found_ether=$(awk -f check-bulk-results.awk bulk_results)
    if [[ $found_ether -eq 1 ]]; then
        echo "INFO : FOUND SOMETHING, PRECISE ANALYSIS ONGOING"
        awk -f precise-ipc-check.awk $addresses_file >> jackpot.txt
    else
        rm -fr $addresses_file
    fi

    rm -fr bulk_results
}

if [[ -e "check_balance.lock" ]]; then
    echo "WARNING: ANOTHER INSTANCE OF SCRIPT IS RUNNING. STOPPING"
    exit 1
else
    touch "check_balance.lock"
fi

contact_mode=""
addresses_file=""
jackpot_file=""
folder=""

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
    --jackpot | -j)
        jackpot_file=$2
        shift
        ;;
    --folder)
        folder=$2
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

if [[ -z $jackpot_file ]]; then
    echo "ERROR: jackpot file not provided"
    exit 1
fi

if [[ -z $folder ]] && [[ -z $addresses_file ]]; then
    echo "ERROR: none of folder or addresses_file is provided"
    exit 1
fi

if [[ ! -z $folder ]] && [[ ! -z $addresses_file ]]; then
    echo "ERROR: both folder and addresses_file have been provided. Only one of them is allowed"
    exit 1
fi

if [[ ! -z $folder ]]; then
    for file in $folder; do
        process_file $file
    done
else
    process_file $addresses_file
fi

rm -fr "check_balance.lock"

echo "INFO - END"