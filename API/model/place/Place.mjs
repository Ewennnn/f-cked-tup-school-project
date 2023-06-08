'use strict'

import Photo from "./Photo.mjs"

export default class Place {
    place_id
    name
    coords
    rating
    types
    photos

    constructor(obj) {
        Object.assign(this, obj)

        if (this.photos == undefined) {
            delete this.photos
        } else {
            this.photos = obj.photos.map(it => new Photo(it))
        }
    }
}