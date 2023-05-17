#!/bin/bash

if [[ $(pwd) != "*/website/SAE" ]]; then
    echo -e "\n\t$(tput bold)Change current location to WEB project$(tput sgr0)"
    cd ./website/SAE
fi

npm i
npm run build
./node_modules/.bin/serve dist -l 3100