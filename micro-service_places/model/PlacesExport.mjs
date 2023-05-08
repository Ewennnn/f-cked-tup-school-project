'use strict'

import Joi from "joi"
import Localisation, { localisationModel } from "./Localisation.mjs"
import Weather, { weatherModel } from "./Weather.mjs"

export const placesExportModel = Joi.object({
    localisation: localisationModel.description("Localisation of the weather data"),
    weather: Joi.array().items(weatherModel).description("Collection of the weather predictions for the next 14 days.")
})

export default class PlacesExport {
    localisation
    place

    constructor(obj) {
        try {
            this.localisation = new Localisation({
                city: obj.city.name,
                // insee: obj.city.insee,
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
                this.place = obj.place
            }
        }
    }

    json() {
        return JSON.stringify(this)
    }
}