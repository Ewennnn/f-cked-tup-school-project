'use strict'

import WeatherExport from "./WeatherExport.mjs"

export default class DailyWeatherExport {
    date
    localisation
    weather

    constructor(obj) {
        this.date = new Date(obj.date)
        
        const weatherInfos = new WeatherExport(obj)
        Object.assign(this, weatherInfos)
    }
}