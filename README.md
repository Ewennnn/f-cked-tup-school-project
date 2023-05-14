# Développement d'une application complexe - SAE4

## Composition du groupe

- Barassin Lénny
- Beneteau Victor
- Boulay Jonathan
- Bosquet Ewen

## Documentation

## Technique

A chaque micro-service est attribué un port définit dans le tableau ci-dessous

|Micro-service|Prise en chage|port|VPS route|
|:--:|:--:|:--:|:--:|
|Méteo|Ewen|3001|/api/meteo/|
|Places|Victor|3002|/api/places/|
|Users|Lénny et Jonathan|3003|/api/users/|
|Location|Ewen|3004|/api/location/|


Lénny et Jonathan travaillent tous les deux sur le micro-service Users car il nécéssite la mise en place d'une base de données tandis que les deux autres micro-services font "uniquement" appel à d'autres micro-services externes existants.

### Script pm2

Un [script](pm2.sh) permettant de gérer nos multiples micro-services est disponible à la racine du fichier. Celui ci permet d'effectuer les actions suivantes:

|Argument|Actions|
|:--:|:--|
|--init|Initialise tout le système backend du projet.</br>Installe toutes les dépendances et démarre tous les services avec **pm2**. |
|--run nom-du-service|Execute tous les micro-services configurer dans le [fichier de configuration pm2](/ecosystem.config.js). <br/>Si le nom du service est spécifié, seul celui-ci est executé. |
|--stop nom-du-service|Ferme tous les micro-services actuellement lancés par pm2.<br/>Si le nom du service est spécifié, seul celui-ci est arrêté.|
|--restart nom-du-service|Redémarre tous les micro-services actuellement lancés par pm2.<br/>Si le nom du service est spécifié, seul celui-ci est redémarré.|
|--reload nom-du-service|Recharge tous les micro-services actuellement lancés par pm2. <br/>Si le nom du service est spécifié, seul celui-ci est rechargé.|
|--status|Affiche le status de tous les micro-services actuellement lancés par pm2.|
|--logs nom-du-service|Affiche les logs de tous les micro-services actuellement lancés par pm2. <br/> Si mle nom du micro-service est spécifié, seul les logs de celui-ci sont affichées.|