'use strict'

import { weatherDao } from "../dao/weatherDAO.mjs"
import { meteoConceptCopyData } from "../dao/fakeDataDAO.mjs"

// Controlleur du micro-service
export const weatherController = {

    findPrevisionsByInsee : async (code_insee) => {
        return await weatherDao.find14DaysPrevisionsByInsee(code_insee)
    },
    findDayPrevisionsByInsee : async (date, code_insee) => {
        return await weatherDao.findDatePrevisionsByInsee(date, code_insee)
    },
    findCopyDataOfMeteoConcept : () => { return meteoConceptCopyData }
}