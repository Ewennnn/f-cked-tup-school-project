'use strict'

export default class Place {
    place_id
    name
    rating
    types
    photos

    constructor(obj) {
        Object.assign(this, obj)
    }
}