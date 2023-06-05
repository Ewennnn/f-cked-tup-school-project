'use strict'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCbMInaYLcbo9HZzZ4Eg3kBxkz2lnWO1N0'

export default class Photo {
    width
    photo_reference
    
    constructor(obj) {
        Object.assign(this, obj)
        if (this.width == undefined) {
            this.width = 400
        }
    }

    getLink() {
        return `https://maps.googleapis.com/maps/api/place/photo?`+
        `maxwidth=${this.width}` +
        `&photo_reference=${this.photo_reference}` +
        `&key=${GOOGLE_MAPS_API_KEY}`
    }
}