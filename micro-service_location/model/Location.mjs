'use strict'

import Coordinates from "../../micro-service_meteo/model/Coordinates.mjs"
import Joi from 'joi'
import { coordinatesModel } from "./Coordinates.mjs"

export const locationModel = Joi.object({
    city: Joi.string().required().description("Name of the city"),
    code_insee: Joi.number().required().description("Insee code of the city"),
    coords: coordinatesModel
})

export default class Location {
    city
    code_insee
    coords

    constructor(obj) {
        this.city = obj.city.name
        this.code_insee = obj.city.insee
        this.coords = new Coordinates({
            latitude: obj.city.latitude,
            longitude: obj.city.longitude,
        })
    }
}