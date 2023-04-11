'use strict'
export default class Weather {
    ts
    temperature
    rain
    coordinates // Coordinates Object
    constructor(obj) {
        Object.assign(this,obj)
    }
}