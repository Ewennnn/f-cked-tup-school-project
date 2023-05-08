'use strict'

import Joi from "joi"

export const placeModel = Joi.object({
    timestamp: Joi.date().timestamp().description("Timestamp reference for the predictions weather values"),
    weather: Joi.number().integer().required().description("Weather code that can be mapped by météo-concept icons API to get an icon of the current weather code"),
    temp2m: Joi.number().integer().required().description("Temperature in °C"),
    probarain: Joi.number().integer().required().description("Percentage of the rain probability"),
    wind10m: Joi.number().integer().required().description("Avearge wind speed in km/h"),
    probawind70: Joi.number().integer().description("Percentage of the wind speed is more than 70km/h")
})

// Format de données donnant les informations pour un point géographique donné
export default class Place {
    location       // Localisation pour laquelle les données suivantes sont valables

    constructor(obj) {

        // Convertis un objet en une entité Weather en appliquant uniquement les valeurs aux clés existantes
        for (var property in obj) {
            if (obj.hasOwnProperty(property) && this.hasOwnProperty(property))
                this[property] = obj[property]
        }
    }

    json() {
        return JSON.stringify(this)
    }
}