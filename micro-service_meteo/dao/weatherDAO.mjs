'use strict'

// Cache permettant de limiter le nombre d'appels à l'API
const CACHE = []

// Si plusieurs appels sont effectués dans un interval de temps restreint, les données sont récupérés depuis le cache.
// Les données météos fluctuent assez rarement, on peut donc se permettre d'appeler l'API uniquement toutes les 12h maximum.
export const weatherDao = {
    //Récupère les températures précices à 3 heures d'intervalles sur 48h
    findShortPrevisionalTemp : (coordinates) => {throw new Error("Not implemented")},

    //Récupère les températures moyennes de la journée pour les 14 prochaines jours
    findLongPrevisionalTemp : (coordinates) => {throw new Error("Not implemented")},

    //Récupère les prévisions de pluie précices à 3 heures d'intervalles sur 48h
    findShortWeatherPrevisions : (coordinates) => {throw new Error("Not implemented")},

    //Récupère les prévisions de pluie moyennes de la journée pour les 14 prochains jours
    findLongWeatherPrevisions : (coordinates) => {throw new Error("Not implemented")},
}