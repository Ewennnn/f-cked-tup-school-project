'use strict'

import Coordinates from "../location/Coordinates.mjs"
import Photo from "./Photo.mjs"

export default class Place {
    place_id
    name
    vicinity
    coords
    rating
    types
    photos

    constructor(obj) {
        this.place_id = obj.place_id
        this.name = obj.name
        this.vicinity = obj.vicinity
        this.coords = new Coordinates(obj.location || obj.coords)
        this.rating = obj.rating
        this.types = obj.types
        if (obj.photos == undefined) {
            delete this.photos
        } else {
            this.photos = obj.photos.map(it => new Photo(it))
        }
    }
}