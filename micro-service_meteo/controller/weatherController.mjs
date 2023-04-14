'use strict'

import { weatherDao } from "../dao/weatherDAO.mjs"

export const weatherController = {

    findPrevisionsByInsee : async (code_insee) => {
        const daoResp = await weatherDao.find14DaysPrevisionsByInsee(code_insee)
        console.log(daoResp.weather[0]);
    },
    findShortTemperature : async (coordinates) => {throw new Error("Not implemented")},

    findFullWeather : async (coordinates) => {throw new Error("Not implemented")},
    findShortWeather : async (coordinates) => {throw new Error("Not implemented")},

    findCompletePrevisions : async (coordinates) => {throw new Error("Not implemented")}
}

weatherController.findPrevisionsByInsee(44109)

await setTimeout(() => {weatherController.findPrevisionsByInsee(44109)}, 500)