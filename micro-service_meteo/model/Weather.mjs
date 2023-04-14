'use strict'

import Coordinates from "./Coordinates.mjs"
import Localisation from "./Localisation.mjs"

export default class Weather {
    timestamp

    weather
    temp2m
    probarain
    wind10m
    probawind70
    constructor(obj) {
        // Convertis un objet en une entité Weather en appliquant uniquement les valeurs aux clés existantes
        this.timestamp = new Date(obj.datetime).getTime() / 1000

        for (var property in obj) {
            if (obj.hasOwnProperty(property) && this.hasOwnProperty(property))
                this[property] = obj[property]
        }
    }

    json() {
        return JSON.stringify(this)
    }
}