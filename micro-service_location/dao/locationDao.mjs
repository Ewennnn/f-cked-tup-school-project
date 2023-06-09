'use strict'

import Location from '../model/Location.mjs'
import CacheLocation from '../model/CacheLocation.mjs'
import Coordinates from '../../micro-service_meteo/model/Coordinates.mjs'
import fetchUsingAgent from '../../microServices.config.mjs'

const CACHE = []

export const locationDao = {
    findCity : async (infos) => {

        // Récupération des informations provenant du cache
        const fromCache = await findInCache(infos)
        if (fromCache != null) {
            console.log(`find ${fromCache.location.city} from cache !`)
            return fromCache.location
        }

        // Si l'information n'est pas présente dans le cache, on appel le service extene
        const url = getURL(infos)
        // console.log(await fetchUsingAgent("https://api.meteo-concept.com/api/location/city?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee=44109"));
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        // Retourne le code d'erreur du service contacté
        if (body.code || Array.isArray(body.cities) && Array.of(...body.cities).length == 0) {
            return body
        }

        // On sérialise les données puis on ajoute cette nouvelle donée au cache
        const data = Array.isArray(body.cities) && body.cities.length > 0 ? new Location({city: body.cities[0]}) : new Location(body)
        putInCache(data, infos)
        return data
    }
}

// Ajoute dans le cache les informations d'une ville en prenant en compte les informations entrées dans l'URL
function putInCache(data, infos) {
    if (infos.code_insee) {
        CACHE.push(new CacheLocation({
            searched_coords: new Coordinates({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            }),
            location: data
        }))
    } else if (infos.coords) {      // On spécifie les coordonnées entrée par l'utilisateur afin de la pas avoir à recontacter le service si ces mêmes coordonnées sont de nouveau entrés
        CACHE.push(new CacheLocation({
            searched_coords: new Coordinates({
                latitude: infos.coords.latitude,
                longitude: infos.coords.longitude
            }),
            location: data
        }))
    } else if (infos.city) {
        CACHE.push(new CacheLocation({
            searched_coords: new Coordinates({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            }),
            location: data
        }))
    }
}

// Cherche et renvoie une donnée si elle a déjà été recherchée
function findInCache(infos) {
    let cityInfos = null
    if (infos.code_insee) {
        CACHE.forEach(it => {
            if (it.location.code_insee == infos.code_insee) {
                cityInfos = it
                return
            }
        })
    } else if (infos.coords) {
        CACHE.forEach(it => {
            if (it.searched_coords.latitude == infos.coords.latitude && it.searched_coords.longitude == infos.coords.longitude) {
                cityInfos = it
                return
            }
        })
    } else if (infos.city) {
        CACHE.forEach(it => {
            if (it.location.city == infos.city) {
                cityInfos = it
                return
            }
        })
    }
    return cityInfos
}

// Génère l'URL du service à contacter en fonction de la route contacté
function getURL(infos) {
    if (infos.code_insee) {
        return `https://api.meteo-concept.com/api/location/city?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee=${infos.code_insee}`
    } else if (infos.coords) {
        return `https://api.meteo-concept.com/api/location/city?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&latlng=${infos.coords.latitude},${infos.coords.longitude}`
    } else if (infos.city) {
        return `https://api.meteo-concept.com/api/location/cities?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&search=${infos.city}`
    }
}