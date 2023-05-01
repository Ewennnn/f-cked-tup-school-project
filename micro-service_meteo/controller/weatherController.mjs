'use strict'

import { weatherDao } from "../dao/weatherDAO.mjs"
import { meteoConceptCopyData } from "../dao/fakeDataDAO.mjs"

export const weatherController = {

    findPrevisionsByInsee : async (code_insee) => {
        return await weatherDao.find14DaysPrevisionsByInsee(code_insee)
    },
    findDayPrevisionsByInsee : async (date, code_insee) => {
        return await weatherDao.findDatePrevisionsByInsee(date, code_insee)
    },

    findFullWeather : async (coordinates) => {throw new Error("Not implemented")},
    findShortWeather : async (coordinates) => {throw new Error("Not implemented")},

    findCompletePrevisions : async (coordinates) => {throw new Error("Not implemented")},

    findCopyDataOfMeteoConcept : () => { return meteoConceptCopyData }
}