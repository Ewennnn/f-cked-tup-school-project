'use strict'

import Coordinates from "./Coordinates.mjs"

export default class Location {
    city
    code_insee
    coords

    constructor(obj) {
        this.city = obj.city
        this.code_insee = obj.code_insee
        this.coords = new Coordinates({
            latitude: obj.latitude || obj.coords.latitude,
            longitude: obj.longitude || obj.coords.longitude
        })
    }
}