'use strict'

export default class Weather {
    latitude
    longitude
    constructor(obj) {
        Object.assign(this,obj)
    }
}