'use strict'

import { describe } from "mocha"
import { locationController } from "./controller/locationController.mjs"
import Location from "./model/Location.mjs"
import chai from "chai"

describe("Location micro-service tests", () => {
    it("Création d'une entité Location", () => {
        const loc = new Location({
            city: "Rennes",
            code_insee: 35238,
            latitude: 48.112,
            longitude: -1.6819
        })

        chai.expect(loc).contains.keys("city", "code_insee", "coords")
        chai.expect(loc.coords).contains.keys("latitude", "longitude")
    })

    it("Location of Rennes using right coordinates", async () => {
        const loc = await locationController.findLocationByCoordinates(48.112, -1.6819)
        
        chai.expect(loc).contains.keys("city", "code_insee", "coords")
        chai.expect(loc.city).to.eql("Rennes")

        chai.expect(parseInt(loc.code_insee)).to.eql(35238)
        chai.expect(parseFloat(loc.coords.latitude)).to.eql(48.112)
        chai.expect(parseFloat(loc.coords.longitude)).to.eql(-1.6819)
    })

    it("Location of Rennes using not exacts coordinates", async () => {
        const loc = await locationController.findLocationByCoordinates(48.109, -1.6919)

        chai.expect(loc.city).to.eql("Rennes")
        chai.expect(parseInt(loc.code_insee)).to.eql(35238)
        chai.expect(parseFloat(loc.coords.latitude)).to.eql(48.112)
        chai.expect(parseFloat(loc.coords.longitude)).to.eql(-1.6819)
    })

    it("Location of Nantes using code insee", async () => {
        const loc = await locationController.findLocationByInsee(44109)

        chai.expect(loc.city).to.eql("Nantes")

        chai.expect(parseInt(loc.code_insee)).to.eql(44109)
        chai.expect(parseFloat(loc.coords.latitude)).to.eql(47.2316)
        chai.expect(parseFloat(loc.coords.longitude)).to.eql(-1.5483)
    })

    it("Location wrong code_insee", async () => {
        const error = await locationController.findLocationByInsee(69420)
        chai.expect(error).exist.keys("code", "message")
        chai.expect(error.code).eql(400)
        chai.expect(error.message).contains("code", "INSEE", "invalide")
    })

    it("Location wrong coordinates", async () => {
        const error = await locationController.findLocationByCoordinates(181.100, -1.245)
        chai.expect(error).exist.keys("code", "message")
        chai.expect(error.code).eql(400)
        chai.expect(error.message).contains("position géographique", "en-dehors des limites")
    })
})