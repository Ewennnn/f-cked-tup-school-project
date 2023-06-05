'use strict'

export default class Coordinates {
    latitude
    longitude

    constructor(obj) {
        this.latitude = obj.latitude || undefined
        this.longitude = obj.longitude || undefined   
    }
}