'use strict'

export default class CacheLocation {
    searched_coords
    location

    constructor(obj) {
        this.searched_coords = obj.searched_coords
        this.location = obj.location
    }
}