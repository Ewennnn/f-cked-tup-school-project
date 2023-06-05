'use strict'
import chai from "chai"
import Photo from "./../model/place/Photo.mjs"
import Place from "./../model/place/Place.mjs"
import Location from "../model/location/Location.mjs"
import fetchUsingAgent from "../../microServices.config.mjs"

describe('test des entités', () => {

    it("test", async () => {
        chai.expect({test: "lala"}).to.be.eql({test: "lala"})
    })

    it("Photo", async () => {
        const photo = new Photo({width : 500, photo_reference : "dghiuq"})
        chai.expect(photo).to.be.eql(new Photo({width : 500, photo_reference : "dghiuq"}))
        chai.expect("https://maps.googleapis.com/maps/api/place/photo?maxwidth="+photo.width
        +"&photo_reference="+photo.photo_reference
        +"&key="+"AIzaSyCbMInaYLcbo9HZzZ4Eg3kBxkz2lnWO1N0").to.be.eql(photo.getLink())
    })

    it("Photo fetch", async () => {
        const photo = new Photo({photo_reference: "AZose0lSDpJ5Z1S8_2SFTynE0RAHMnqbSHFHNXo__eHSWp0hGBhhJUQedsLpcHLx2LS5-rURC7LQx1q0Dd2WyXZH9IvOO4hArcT2B62Y-TWqoQLx4DDQMterY79JUVkSDBzCgvzEGV5iob6Q_Jr7DpH9jQyhzUQcM_i9QIzjBEm17aN1kt-E"})
        const link = photo.getLink()
        const call = await fetchUsingAgent(link)
        chai.expect(call.status).to.be.eql(200)
    })

    it("Place", async () => {
        const place = new Place({place_id: "gciyd",name:"test",rating:4.5,types:["Restaurant"],photos:"hcuoqguiqgdusiogq"})
        chai.expect(place).to.be.eql({place_id: "gciyd",name:"test",rating:4.5,types:["Restaurant"],photos:"hcuoqguiqgdusiogq"})
        chai.expect(place.place_id).to.be.eql("gciyd")
        chai.expect(place.name).to.be.eql("test")
        chai.expect(place.rating).to.be.eql(4.5)
        chai.expect(place.photos).to.be.eql("hcuoqguiqgdusiogq")
        chai.expect(place.types).to.have.members(["Restaurant"])
    })

    it("Location", async () => {
        const loc = new Location({
            date: new Date(Date.now()),
            code_insee: 35238,
            latitude: 48.1172,
            longitutde: -1.6777,
        })

        chai.expect(loc).contains.keys("coords")
        chai.expect(loc.coords).contains.keys("latitude", "longitude")
    })
})