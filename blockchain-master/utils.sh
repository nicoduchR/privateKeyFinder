#!/bin/bash

log() {
    if [[ -z $1 ]]; then
        echo "ERROR - no log type provided"
        return
    fi
    
    local cur_date=$(date)
    case $1 in
        
        info | INFO)
            echo "INFO - $cur_date - $2"
        ;;
        
        warn | warning | WARN | WARNING)
            echo "WARN - $cur_date - $2"
        ;;
        
        error | ERROR)
            echo "ERROR - $cur_date - $2"
        ;;
        
        *)
            echo "LOGERROR - UNKNOWN LOG TYPE"
        ;;
    esac
}