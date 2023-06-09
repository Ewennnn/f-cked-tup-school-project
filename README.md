# Développement d'une application complexe - SAE4

## Composition du groupe

- Barassin Lénny
- Beneteau Victor
- Boulay Jonathan
- Bosquet Ewen

## Finalitées du projet

Plusieurs utilisateurs peuvent utiliser notre service depuis une application mobile pour smartphone ou tablette ou depuis un site web. Ces utilisateurs peuvent remplir ou sélectionner un lieu et une date (facultatif) dans un formulaire puis recevront une liste de lieux pour y effectuer un rendez-vous amoureux, romantique, amical ou autre. Les informations affichés à l’utilisateur lors de la génération des rendez-vous seront au minimum :

- Un lieux de rencontre (restaurant, parc, cinéma etc…)
- Une date avec une horaire
- La météo (au minimum température) avec précipitations si possible pour la date choisie
- Les utilisateurs devront se créer un compte afin de pouvoir accéder au service. Ils pourront garder en favoris un rendez-vous complet ou bien juste un lieu afin de potentiellement pouvoir le retrouver plus tard. (Pas implémenté dans les IHM)

## Technique

### Services

A chaque micro-service est attribué un port définit dans le tableau ci-dessous.

|Micro-service|Prise en chage|port|VPS route|
|:--:|:--:|:--:|:--:|
|WEB|Victor et Lénny|3100|/|
|API|Jonathan et Ewen|3200|/api/|
|Méteo|Ewen|3001|/api/meteo/|
|Places|Victor|3002|/api/places/|
|Users|Lénny et Jonathan|3003|/api/users/|
|Location|Ewen|3004|/api/location/|
|App Android|Lénny et Victor|X|X|

### Script pm2

Un [script](pm2.sh) permettant de gérer nos multiples micro-services est disponible à la racine du fichier. Celui ci permet d'effectuer les actions suivantes:

|Argument|Actions|
|:--:|:--|
|--init|Initialise tout le système backend du projet.</br>Installe toutes les dépendances et démarre tous les services avec **pm2**.</br>Une seconde option **--push-users** permet d'ajouter des utilisateurs dans la base de données lors de l'initialisation du projet. |
|--run _nom-du-service_|Execute tous les micro-services configurer dans le [fichier de configuration pm2](/ecosystem.config.js). <br/>Si le nom du service est spécifié, seul celui-ci est executé. |
|--stop _nom-du-service_|Ferme tous les micro-services actuellement lancés par pm2.<br/>Si le nom du service est spécifié, seul celui-ci est arrêté.|
|--restart _nom-du-service_|Redémarre tous les micro-services actuellement lancés par pm2.<br/>Si le nom du service est spécifié, seul celui-ci est redémarré.|
|--reload _nom-du-service_|Recharge tous les micro-services actuellement lancés par pm2. <br/>Si le nom du service est spécifié, seul celui-ci est rechargé.|
|--status|Affiche le status de tous les micro-services actuellement lancés par pm2.|
|--logs _nom-du-service_|Affiche les logs de tous les micro-services actuellement lancés par pm2. <br/> Si le nom du micro-service est spécifié, seul les logs de celui-ci sont affichées.|

### Installation et déploiement

1. Clonez le projet sur votre poste de travail local
2. Le script `pm2.sh` possède une option permettant d'initialiser les différents services. Depuis un terminal, placez-vous dans le dossier **à la racine du projet** puis éxécutez la commande suivante:

```sh
./pm2.sh --init --push-users
```

3. Attendez que tous les services soient démarrés. Le dernier service à se lancer est le site web.
4. Un tableau s'affiche à la fin de l'éxécution du script et permet de visualiser tous les web services déployés.

### Utilisation

Chaque service est définit sur un port définit dans le premier tableau. Le site web est accessible avec l'URL `http://localhost:3100/`. Un compte par défaut est disponible pour se connecter (grâce à l'argument --push-users). Connectez-vous avec les identifiants suivants:

- login: loulou
- password: loulou

### Swaggers

Le swagger de chaque service est accessible en ajoutant `/documentation` à la fin de l'URL. Par exemple _http://localhost:3003/documentation_

### Tests

Dans chaque dossier d'un web service, il est possible d'exécuter la commande `npm test` permettant d'éxécuter une serrie de tests relatifs à ce service.
Exécuter cette même commande depuis la racine du projet, exécutera tous les tests disponibles.

### Logs

Il est possible d'afficher les logs des web services en éxécutant **depuis la racine du projet** `./pm2.sh logs`. Toutes les fonctionnalités du script sont repertoriées dans le tableau ci-dessus.

### App Android

- Utiliser le téléphone Nexus 5X
- Utiliser l'API Android 33
