'use strict'

import Joi from "joi"
import Coordinates, { coordinatesModel } from "./Coordinates.mjs"

export const localisationModel = Joi.object({
    city: Joi.string().required().description("Name of the localisation city"),
    code_insee: Joi.number().integer().required().description("Code insee of the city localisation"),
    coords: coordinatesModel.description("Coordinates of the city localisation")
})

export default class Localisation {
    city
    code_insee
    coords

    constructor(obj) {
        this.city = obj.city || undefined
        this.code_insee = parseInt(obj.insee) || undefined
        this.coords = new Coordinates({latitude: obj.latitude, longitude: obj.longitude})

    }
}