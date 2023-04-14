'use strict'

import fetch from "node-fetch";
import WeatherExport from "../model/WeatherExport.mjs";
import CacheWeather from "../model/CacheWeather.mjs";

const concept_meteo_api_url = "https://api.meteo-concept.com/api/forecast/daily/periods?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee="
const test_meteo_api_url = "http://51.178.30.150/api/meteo"

// Cache permettant de limiter le nombre d'appels à l'API
const CACHE = []
const CACHE_SECONDS = 60*60*6

// Si plusieurs appels sont effectués dans un interval de temps restreint, les données sont récupérés depuis le cache.
// Les données météos fluctuent assez rarement, on peut donc se permettre d'appeler l'API uniquement toutes les 12h maximum.
export const weatherDao = {
    //Récupère les températures précices à 3 heures d'intervalles sur 48h
    find14DaysPrevisionsByInsee : async (code_insee) => {
        if (!Number.isInteger(code_insee)) {
            return Promise.reject({})
        }
        
        let isInCache = false
        let cacheIndex = undefined
        if (CACHE.length > 0) {
            cacheIndex = 0
            CACHE.forEach(it => {
                if (it.localisation.code_insee == code_insee && it.timestamp + CACHE_SECONDS > Math.floor(Date.now() / 1000)) {
                    isInCache = true
                    return
                }
                cacheIndex += 1
            })
        }

        if (isInCache) {
            return new WeatherExport(CACHE[cacheIndex])
        }
        // const response = await fetch(concept_meteo_api_url + String(code_insee))
        const response = await fetch(test_meteo_api_url)
        const content = await response.json()
        const data = new WeatherExport(content)
        CACHE.push(new CacheWeather(data))

        return data;
    },

    //Récupère les températures moyennes de la journée pour les 14 prochaines jours
    findLongPrevisionalTemp : (coordinates) => {throw new Error("Not implemented")},

    //Récupère les prévisions de pluie précices à 3 heures d'intervalles sur 48h
    findShortWeatherPrevisions : (coordinates) => {throw new Error("Not implemented")},

    //Récupère les prévisions de pluie moyennes de la journée pour les 14 prochains jours
    findLongWeatherPrevisions : (coordinates) => {throw new Error("Not implemented")},
}