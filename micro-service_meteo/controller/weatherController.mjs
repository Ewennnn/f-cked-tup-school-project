'use strict'

import { weatherDao } from "../dao/weatherDAO.mjs"

export const weatherController = {

    findPrevisionsByInsee : async (code_insee) => {
        return await weatherDao.find14DaysPrevisionsByInsee(code_insee)
    },
    findShortTemperature : async (coordinates) => {throw new Error("Not implemented")},

    findFullWeather : async (coordinates) => {throw new Error("Not implemented")},
    findShortWeather : async (coordinates) => {throw new Error("Not implemented")},

    findCompletePrevisions : async (coordinates) => {throw new Error("Not implemented")}
}