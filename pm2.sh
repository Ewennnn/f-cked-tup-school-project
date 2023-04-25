#!/bin/bash
shopt -s expand_aliases
alias pm2='./node_modules/.bin/pm2'

arg=$1
if [[ $2 ]]; then
    echo "Impossible de préciser deux arguments"
    exit 1
fi

if [[ $arg == "--run" ]]; then
    pm2 start ecosystem.config.js
elif [[ $arg == "--restart" ]]; then
    pm2 restart ecosystem.config.js
elif [[ $arg == "--stop" ]]; then
    pm2 stop all
elif [[ $arg == "--status" ]]; then
    pm2 status
else
    echo "Argument non reconnu"
fi