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

Lénny et Jonathan travaillent tous les deux sur le micro-service Users car il nécéssite la mise en place d'une base de données tandis que les deux autres micro-services font "uniquement" appel à d'autres micro-services externes existants.