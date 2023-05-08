'use strict'

import Joi from "joi"
import Localisation, { localisationModel } from "./Localisation.mjs"
import Place, { placeModel } from "./Place.mjs"

export const placesExportModel = Joi.object({
    localisation: localisationModel.description("Localisation of the place data"),
    place: Joi.array().items(placeModel).description("Collection of the information about the place.")
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
            this.place = []
            if (Array.isArray(obj.forecast)) {

                obj.forecast.forEach(it => 
                it.forEach(p => 
                    this.place.push(new Place(p))
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