'use strict'

import { locationDao } from "../dao/locationDao.mjs"

export const locationController = {
    findLocationByInsee : async (code_insee) => {
        return await locationDao.findCity({
            type: "insee",
            code_insee: code_insee
        })
    },
    findLocationByCoordinates : async (latitude, longitude) => {
        return await locationDao.findCity({
            type: "coords",
            coords: {
                latitude: latitude,
                longitude: longitude
            }
        })
    }
}