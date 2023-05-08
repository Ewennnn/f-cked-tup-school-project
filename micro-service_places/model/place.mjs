'use strict'
export default class Place {
    placeId
    coords

    constructor(obj) {
        Object.assign(this,obj)
    }
}