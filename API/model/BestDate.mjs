'use strict'

import Weather from "./Weather.mjs"
import Place from "./place/Place.mjs"
import Location from "./location/Location.mjs"

export default class BestDate {
    date
    location
    place
    weather

    constructor(obj) {
        this.date = new Date(obj.date)
        this.location = new Location(obj.location)
        this.place = new Place(obj.place)
        this.weather = new Weather(obj.weather)
    }
}