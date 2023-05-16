'use strict'

import WeatherExport from "../model/WeatherExport.mjs";
import CacheWeather from "../model/CacheWeather.mjs";
import fetchUsingAgent from "../../microServices.config.mjs";

const concept_meteo_api_url = "https://api.meteo-concept.com/api/forecast/daily/periods?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee="
const test_meteo_api_url = "http://51.178.30.150/api/meteo/test"

// Cache permettant de limiter le nombre d'appels à l'API
const CACHE = []
const CACHE_SECONDS = 60*60*6

// DAO du micro-service. Permet de récupérer les données auprès d'un autre service ou d'une autre source de données.
// Si plusieurs appels sont effectués dans un interval de temps restreint, les données sont récupérés depuis le cache.
// Les données météos fluctuent assez rarement, on peut donc se permettre d'appeler l'API uniquement toutes les 12h maximum.
export const weatherDao = {
    //Récupère les données météorologies à intervalles de 6h sur les 14 prochains jours.
    find14DaysPrevisionsByInsee : async (code_insee) => {
        if (!Number.isInteger(code_insee)) {
            return Promise.reject({})
        }
        
        // Vérifie si le code insee recherché est présent dans le cache 
        let isInCache = false
        let cacheIndex = undefined
        if (CACHE.length > 0) {
            cacheIndex = 0
            CACHE.forEach(it => {
                if (it.localisation.code_insee == code_insee) {     // Si une données dans le cache est celle dont le code_insee est celui recherché
                    console.log("find weather from cache")
                    if (it.timestamp + CACHE_SECONDS > Math.floor(Date.now() / 1000)) {     // Si l'enregistrement de la donnée du cache est ancienne de moins de 6 heures
                        isInCache = true
                    } else {    // Sinon on supprime cette donnée du cache
                        console.log("remove old value from cache. Last save for insee code " + code_insee + ": " + CACHE[cacheIndex].timestamp)
                        CACHE.splice(cacheIndex, 1)
                    }
                    console.log(CACHE.length)
                    return  // La boucle est arrêté car une donnée dans le cache a été trouvée et il a été spécifié quoi faire en fonction de la validitée de cette donnée
                }
                cacheIndex += 1
            })
        }

        if (isInCache) {    // Si la donnée provient du cache
            return new WeatherExport(CACHE[cacheIndex])
        }
        // Sinon récupération de données auprès de l'API Météo-Concept
        const response = await fetchUsingAgent(concept_meteo_api_url + String(code_insee))
        // const response = await fetch(test_meteo_api_url)
        const content = await response.json()   // Conversion en un objet de la réponse
        const data = new WeatherExport(content) // Création de l'entité de données

        CACHE.push(new CacheWeather(data))      // Stockage de la nouvelle donnée dans le cache

        return data;    // Envoie de la réponse
    },

    //Récupère les données météorologies à intervalle de 6h pour un jour donnée
    findDatePrevisionsByInsee : async (timestamp, code_insee) => {
        const weather = await weatherDao.find14DaysPrevisionsByInsee(code_insee)    // Récupération des données météorologies (pouvant provenir du cache)
        const date = new Date(timestamp)

        let dateWeather = []
        weather.weather.forEach(it => {
            if (new Date(it.timestamp * 1000).getDate() === date.getDate()) {       // Si la date (numéro du jour uniquement) parmis la liste des données correspond à la date recherchée
                dateWeather.push(it)    // La date est ajoutée aux valeurs retournées
                console.log("find " + new Date(it.timestamp * 1000).getDate());
            }
        })
        
        return {date: date, localisation: weather.localisation, weather: dateWeather}   // Envoie des données
    },
}