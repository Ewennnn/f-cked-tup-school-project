'use strict'

import WeatherExport from "./WeatherExport.mjs"

// Format des données stockées dans le cache
export default class CacheWeather {
    localisation
    timestamp
    weather

    constructor(obj) {
        if (obj instanceof WeatherExport) {
            this.localisation = obj.localisation
            this.timestamp = Math.floor(Date.now() / 1000)
            this.weather = obj.weather
        }
    }

    export() {
        return new WeatherExport(this)
    }
}