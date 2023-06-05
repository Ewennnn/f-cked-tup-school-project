'use strict'

export default class BestDate {
    location
    place
    weather

    constructor(obj) {
        Object.assign(this, obj)
    }
}