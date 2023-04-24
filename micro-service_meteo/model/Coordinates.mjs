'use strict'

import Joi from "joi"

export const coordinatesModel = Joi.object({
    latitude: Joi.number().required().description("Latitude value of the coordinates"),
    longitude: Joi.number().required().description("Longitude of the coordinates"),
})

export default class Coordinates {
    latitude
    longitude

    constructor(obj) {
        this.latitude = obj.latitude || undefined
        this.longitude = obj.longitude || undefined   
    }
}