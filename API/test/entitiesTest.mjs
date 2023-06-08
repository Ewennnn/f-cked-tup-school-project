'use strict'
import chai from "chai"
import Photo from "./../model/place/Photo.mjs"
import Place from "./../model/place/Place.mjs"
import Location from "../model/location/Location.mjs"
import fetchUsingAgent from "../../microServices.config.mjs"
import BestDate from "../model/BestDate.mjs"
import Weather from "../model/weather/Weather.mjs"

describe('test des entités', () => {

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
        const place = new Place({place_id: "gciyd",name:"test", coords: {latitude: 40.12, longitude: -1.52},rating:4.5,types:["Restaurant"],photos:[{photo_reference: "hcuoqguiqgdusiogq"}]})
        chai.expect(place).to.be.eql({place_id: "gciyd",name:"test", coords: {latitude: 40.12, longitude: -1.52},rating:4.5,types:["Restaurant"],photos:[{photo_reference: "hcuoqguiqgdusiogq", width: 400}]})
        chai.expect(place.place_id).to.be.eql("gciyd")
        chai.expect(place.name).to.be.eql("test")
        chai.expect(place.rating).to.be.eql(4.5)
        chai.expect(place.photos).to.be.eql([{photo_reference: "hcuoqguiqgdusiogq", width: 400}])
        chai.expect(place.types).to.have.members(["Restaurant"])
    })

    it("Location", async () => {
        const loc = new Location({
            city: "Nantes",
            code_insee: 35238,
            latitude: 48.1172,
            longitude: -1.6777,
        })

        chai.expect(loc).contains.keys("coords")
        chai.expect(loc.coords).contains.keys("latitude", "longitude")
    })

    it("Best Date", () => {
        const date = new BestDate({
            date: new Date(Date.now()),
            location: {
                city: "Nantes",
                code_insee: 44109,
                latitude: 47.21725,
                longitude: -1.55336
            },
            place: {
                place_id: "identifier",
                name: "restaurant",
                rating: 4.4,
                types: ["restaurant", "point_of_interest", "food"],
                photos: [
                    new Photo({photo_reference: "reference1"}),
                    new Photo({photo_reference: "reference2"}),
                    new Photo({photo_reference: "reference3", width: 550})
                ]
            },
            weather: {
                weather: 2,
                temp2m: 18,
                probarain: 0,
                wind10m: 0,
                probawind70: 10
            }
        })

        chai.expect(date).instanceOf(BestDate)
        chai.expect(date).contains.keys("date")
        chai.expect(date.date.toLocaleDateString("fr")).be.eql(new Date(Date.now()).toLocaleDateString("fr"))
        date.place.photos.forEach(it => {
            chai.expect(it).instanceOf(Photo)
        }    
        )
    })
})