'use strict'

import fetch from 'node-fetch'
import Location from '../model/Location.mjs'

const CACHE = []

export const locationDao = {
    findCity : async (infos) => {

        // Récupération des informations provenant du cache
        const fromCache = findInCache(infos)
        if (fromCache != null) {
            console.log(`find ${fromCache.city} from cache !`)
            return fromCache
        }

        // Si l'information n'est pas présente dans le cache, on appel l'api et on ajoute la réponse au cache
        const url = getURL(infos)
        const response = await fetch(url)
        const body = await response.json()
        try {
            // console.log(await response.json());
            const data = new Location(body) 
            CACHE.push(data)
            return data
        } catch (e) {
            return body
        }

    }
}

function findInCache(infos) {
    let cityInfos = null
    if (infos.code_insee) {
        CACHE.forEach(it => {
            if (it.code_insee == infos.code_insee) {
                cityInfos = it
                return
            }
        })
    } else if (infos.coords) {
        CACHE.forEach(it => {
            if (it.coords.latitude == infos.coords.latitude && it.coords.longitude == infos.coords.longitude) {
                cityInfos = it
                return
            }
        })
    }
    return cityInfos
}

function getURL(infos) {
    if (infos.code_insee) {
        return `http://api.meteo-concept.com/api/location/city?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee=${infos.code_insee}`
    } else if (infos.coords) {
        return `http://api.meteo-concept.com/api/location/city?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&latlng=${infos.coords.latitude},${infos.coords.longitude}`
    }
}