'use strict'

import Joi from "joi"

export const coordinatesModel = Joi.object({
    latitude: Joi.number().required().description("Latitude value of the coordinates"),
    longitude: Joi.number().required().description("Longitude of the coordinates"),
})

// Format de données des coordonnées
export default class Coordinates {
    latitude
    longitude

    constructor(obj) {
        Object.assign(this, obj)
    }
}