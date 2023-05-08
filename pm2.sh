#!/bin/bash
shopt -s expand_aliases
alias pm2='./node_modules/.bin/pm2'

arg=$1
name=$2
if [[ $3 ]]; then
    echo "Impossible de préciser plus de deux arguments"
    exit 1
fi

if [[ -z $name ]]; then
    name="all"
fi

if [[ $arg == "--run" ]]; then
    if [[ $2 ]]; then
        pm2 start ${name}
    else
        pm2 start ecosystem.config.js
    fi
elif [[ $arg == "--restart" ]]; then
    pm2 restart ${name}
elif [[ $arg == "--stop" ]]; then
    pm2 stop ${name}
elif [[ $arg == "--status" ]]; then
    pm2 status
elif [[ $arg == "--reload" ]]; then
    pm2 reload ${name}
    pm2 status
elif [[ $arg == "--logs" ]]; then
    pm2 logs ${name}
else
    echo "Argument non reconnu"
fi