'use strict'

import { describe } from "mocha"
import chai from "chai"
import { placeController } from "./controller/placeController.mjs"
import haversine from "haversine-distance"


describe("Tests du micro-service Places", () => {

    it("Get places using coordinates", async () => {
        const places = await placeController.findRestaurantsByLocation({
            lat: 47.21725,
            lng: -1.55336
        }, 3000)

        chai.expect(places).is.an("array")
        chai.expect(places[0]).exist.keys("place_id", "name", "location", "rating", "types", "user_rating_total", "vicinity")

        places.forEach(place => {
            chai.expect(haversine({lat: 47.21725, lng: -1.55336}, place.location)).lessThan(3000)
        });
    })

    it("Get Place using place_id", async () => {
        
    })
})