'use strict'

import { describe } from "mocha"
import { weatherController } from "./controller/weatherController.mjs"
import Localisation from "./model/Localisation.mjs"
import chai from "chai"

describe("ms-meteo tests", () => {

    it('weather export structure test', async () => {
        const res = await weatherController.findPrevisionsByInsee(35238)

        chai.expect(res).contains.keys("localisation", "weather")
        chai.expect(res.localisation).contains.keys("city", "code_insee", "coords")
        chai.expect(res.localisation.coords).contains.keys("latitude", "longitude")
        chai.expect(res.weather.length).to.be.eql(56)
    })

    it('weather export test', async () => {
        const res = await weatherController.findPrevisionsByInsee(44109)
    
        chai.expect(res.localisation).to.be.eql(new Localisation({
            city: "Nantes",
            insee: 44109,
            latitude: 47.2316,
            longitude: -1.5483,
        }))
    })

    it('weather day test', async () => {
        const res = await weatherController.findDayPrevisionsByInsee(Date.now(), 44109)
        const hours = [2, 8, 14, 20]

        for(let count = 0; count <= 3; count++) {
            chai.expect(new Date(res.weather[count].timestamp * 1000).getDay()).to.be.eql(new Date(Date.now()).getDay())
            chai.expect(new Date(res.weather[count].timestamp * 1000).getHours()).to.be.eql(hours[count])
        }
    })
})