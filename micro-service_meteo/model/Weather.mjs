'use strict'
export default class Weather {
    insee
    latitude
    longitude
    timestamp

    weather
    temp2m
    probarain
    wind10m
    probawind70
    constructor(obj) {
        // Convertis un objet en une entité Weather en appliquant uniquement les valeurs aux clés existantes
        for (var property in obj) {
            if (property == "datetime") {
                this["timestamp"] = new Date(obj[property]).getTime() / 1000
                continue
            }
            if (obj.hasOwnProperty(property) && this.hasOwnProperty(property))
                this[property] = obj[property];
        }
    }
}