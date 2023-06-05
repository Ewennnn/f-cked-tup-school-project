'use strict'

import Coordinates from "./Coordinates.mjs"

export default class Location {
    date
    code_insee
    coords

    constructor(obj) {
        this.date = obj.date
        this.code_insee = obj.code_insee
        this.coords = new Coordinates({
            latitude: obj.latitude,
            longitude: obj.longitude
        })
    }
}