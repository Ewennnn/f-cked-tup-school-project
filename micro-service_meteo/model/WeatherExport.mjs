'use strict'

import CacheWeather from "./CacheWeather.mjs"
import Localisation from "./Localisation.mjs"
import Weather from "./Weather.mjs"

export default class WeatherExport {
    localisation
    weather
    
    constructor(obj) {
        try {
            this.localisation = new Localisation({
                city: obj.city.name,
                insee: obj.city.insee,
                latitude: obj.city.latitude,
                longitude: obj.city.longitude
            })
            this.weather = []
            if (Array.isArray(obj.forecast)) {
                
                obj.forecast.forEach(it => 
                it.forEach(w => 
                    this.weather.push(new Weather(w))
                    )
                )
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.localisation = obj.localisation
                this.weather = obj.weather
            }
        }
    }
            
    json() {
        return JSON.stringify(this)
    }
}