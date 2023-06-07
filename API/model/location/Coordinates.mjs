'use strict'

export default class Coordinates {
    latitude
    longitude

    constructor(obj) {
        this.latitude = parseFloat(obj.latitude) || undefined
        this.longitude = parseFloat(obj.longitude) || undefined   
    }
}