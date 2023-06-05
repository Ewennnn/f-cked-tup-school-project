#!/bin/bash
# Récupération des arguments
shopt -s expand_aliases

arg=$1
name=$2
if [[ $3 ]]; then
    echo "Impossible de préciser plus de deux arguments"
    exit 1
fi

# Si aucun micro-service spécifié
if [[ -z $name ]]; then
    name="all"
fi

# Pour initialiser tous les micro-services
if [[ $arg == "--init" ]]; then
    echo -e "========== Installation de $(tput bold)sae4-microservices$(tput sgr0) =========="
    npm i

    echo -e "\n========== Installation de $(tput bold)ms-location$(tput sgr0) =========="
    cd micro-service_location
    npm i

    echo -e "\n========== Installation de $(tput bold)ms-meteo$(tput sgr0) =========="
    cd ../micro-service_meteo
    npm i

    echo -e "\n========== Installation de $(tput bold)ms-places$(tput sgr0) =========="
    cd ../micro-service_places
    npm i

    echo -e "\n========== Installation de $(tput bold)ms-users$(tput sgr0) =========="
    cd ../micro-service_users
    npm i
    if [[ ! -f ./prisma/data/myDB.db ]]; then
        echo -e "\n\t$(tput bold)Création de la base de données$(tput sgr0)"
        ./node_modules/.bin/prisma generate
        ./node_modules/.bin/prisma db push
    fi
    if [[ $name == "--push-users" ]]; then
        echo -e "\n\t$(tput bold)Ajout d'utilisateurs$(tput sgr0)"
        npm test
        unset name
    fi

    echo -e "\n========== Installation de $(tput bold)API$(tput sgr0) =========="
    cd ../API
    npm i

    # Lancement des micro-services
    echo -e "\n========== $(tput bold)Démarrage des micro-services$(tput sgr0) =========="
    cd ..
    arg="--run"
fi

# Création de l'alias pour le script
alias pm2='./node_modules/.bin/pm2'

if [ $arg == "--run" ] || [ $arg == "run" ] || [ $arg == "--start" ] || [ $arg == "start" ]; then
    if [[ $2 ]]; then
        pm2 start ${name}
    else
        pm2 start ecosystem.config.js
    fi
elif [ $arg == "--restart" ] || [ $arg == "restart" ]; then
    pm2 restart ${name}
elif [ $arg == "--stop" ] || [ $arg == "stop" ]; then
    pm2 stop ${name}
elif [ $arg == "--status" ] || [ $arg == "status" ]; then
    pm2 status
elif [ $arg == "--reload" ] || [ $arg == "reload" ]; then
    pm2 reload ${name}
    pm2 status
elif [ $arg == "--logs" ] || [ $arg == "logs" ]; then
    pm2 logs ${name}
else
    echo "Argument non reconnu"
fi