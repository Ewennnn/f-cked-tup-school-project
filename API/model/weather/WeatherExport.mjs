'use strict'

import Weather from "./Weather.mjs"
import Location from "../location/Location.mjs"

export default class WeatherExport {
    localisation
    weather

    constructor(obj) {
        this.localisation = new Location(obj.localisation)
        
        const weathers = new Array()
        obj.weather.forEach(it => {
            weathers.push(new Weather(it))
        });
        this.weather = weathers
    }
}