'use strict'

import Coordinates from "./Coordinates.mjs"

export default class Localisation {
    city
    code_insee
    coords

    constructor(obj) {
        this.city = obj.city || undefined
        this.code_insee = parseInt(obj.insee) || undefined
        this.coords = new Coordinates({latitude: obj.latitude, longitude: obj.longitude})

    }
}