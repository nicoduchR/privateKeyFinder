#!/bin/bash

echo "INFO - START"
process_file(){
    local addresses_file=$1
    local ipc_file=$2
    local jackpot_file=$3
    echo "INFO - processing $addresses_file"

    local nbr_line=$(wc -l $addresses_file | cut -f 1  -d " ")
    nbr_of_lines=$((nbr_of_lines + nbr_line))

    awk -f gen-bulk-ipc-query.awk $addresses_file | netcat -N -U $ipc_file > bulk_results

    sed -i 's/[{}"]//g' bulk_results
    found_ether=$(awk -f check-bulk-results.awk bulk_results)
    if [[ $found_ether == "jackpot" ]]; then
        echo "INFO : FOUND SOMETHING, PRECISE ANALYSIS ONGOING"
        awk -v ipc_file="$ipc_file" -f precise-ipc-check.awk $addresses_file >> jackpot.txt
        while read line;do
            address=$(cut -f 1 -d "," <<< $line)
            private=$(cut -f 3 -d "," <<< $line)
            balance=$(cut -f 4 -d "," <<< $line)
            json_data="{\"address\":\"$address\",\"private\":\"$private\",\"balance\":\"$balance\"}"
            curl -X POST -d "$json_data" -H "Content-Type: application/json" http://localhost:3334/api/1.0/jackpot
        done <"$jackpot_file"
    elif [[ $found_ether == "error" ]]; then
        echo "ERROR : AN ERROR OCCURED WITH GETH DURING PROCESSING"
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
ipc_file=""

# stats
start=$(date +"%s")
nbr_of_file=0
nbr_of_lines=0

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
    --ipc_file)
        ipc_file=$2
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
echo "INFO - ipc file: $ipc_file"

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
        nbr_of_files=$((nbr_of_files + 1))
        process_file $file $ipc_file
    done
else
    process_file $addresses_file $ipc_file $jackpot_file
fi

rm -fr "check_balance.lock"
end=$(date +"%s")
time_required=$((end - start))
ad_per_sec=$((nbr_of_lines / time_required))

echo "INFO - EXECUTION TIME = $time_required seconds for $nbr_of_lines lines processed in $nbr_of_files files ($ad_per_sec / sec)"
echo "INFO - END"