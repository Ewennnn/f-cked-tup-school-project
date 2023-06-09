'use strict'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCbMInaYLcbo9HZzZ4Eg3kBxkz2lnWO1N0'

export default class Photo {
    width
    photo_reference
    link
    
    constructor(obj) {
        this.width = obj.width
        this.photo_reference = obj.photo_reference
        if (this.width == undefined) {
            this.width = 400
        }
        this.link = this.getLink()
    }

    getLink() {
        return `https://maps.googleapis.com/maps/api/place/photo?`+
        `maxwidth=${this.width}` +
        `&photo_reference=${this.photo_reference}` +
        `&key=${GOOGLE_MAPS_API_KEY}`
    }
}