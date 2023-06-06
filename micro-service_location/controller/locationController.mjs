'use strict'

import { locationDao } from "../dao/locationDao.mjs"

export const locationController = {
    findLocationByInsee : async (code_insee) => {
        return await locationDao.findCity({
            code_insee: code_insee
        })
    },
    findLocationByCoordinates : async (latitude, longitude) => {
        return await locationDao.findCity({
            coords: {
                latitude: latitude,
                longitude: longitude
            }
        })
    },
    findLocationByCity : async (city) => {
        return await locationDao.findCity({
            city: city
        })
    }
}