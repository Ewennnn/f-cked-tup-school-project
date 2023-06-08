'use strict'
import chai from "chai"
import Photo from "./../model/place/Photo.mjs"
import Place from "./../model/place/Place.mjs"
import Location from "../model/location/Location.mjs"
import fetchUsingAgent from "../../microServices.config.mjs"
import BestDate from "../model/BestDate.mjs"
import Weather from "../model/weather/Weather.mjs"
import { apiDAO } from "../dao/apiDAO.mjs"
import WeatherExport from "../model/weather/WeatherExport.mjs"
import DailyWeatherExport from "../model/weather/WeatherDailyExport.mjs"
import User from "../model/User.mjs"

const debugMode = true

describe("API DAO tests", () => {
    it("Location", async () => {
        let byCoordinates = await apiDAO.findLocationCoordinate(47.2,-1.5483)
        let byInsee = await apiDAO.findLocationCodeInsee(44190)
        let byVille = await apiDAO.findLocationVille("Saint-Sébastien-sur-Loire")

        chai.expect(byCoordinates).instanceOf(Location)
        chai.expect(byInsee).instanceOf(Location)
        chai.expect(byVille).instanceOf(Location)

        chai.expect(byCoordinates).to.be.eql(byInsee).to.be.eql(byVille)
    })

    it("Meteo", async () => {
        let allPrevisions = await apiDAO.findPrevisionCodeInsee(44109)

        chai.expect(allPrevisions).instanceOf(WeatherExport)
        chai.expect(allPrevisions.localisation).instanceOf(Location)
        allPrevisions.weather.forEach(it => {
            chai.expect(it).instanceOf(Weather)
        })

        // Test par rapport aux données de localisation provenant du micro-service
        let byInsee = await apiDAO.findLocationCodeInsee(44109)
        chai.expect(allPrevisions.localisation.city).eql(byInsee.city)
        chai.expect(allPrevisions.localisation.code_insee).eql(byInsee.code_insee)
        chai.expect(allPrevisions.localisation.coords).eql(byInsee.coords)
    })

    it("Daily Meteo", async () => {
        const actualDate = new Date(Date.now())
        debugLog("Date format used: " + actualDate.toLocaleDateString("en"));
        let todayPrevisions = await apiDAO.findPrevisionCodeInseeDate(44109, actualDate.toLocaleDateString("en"))
        
        chai.expect(todayPrevisions).instanceOf(DailyWeatherExport)
        todayPrevisions.weather.forEach(it => {
            chai.expect(it).instanceOf(Weather)
            chai.expect(new Date(it.timestamp * 1000).getDay()).eql(actualDate.getDay())
        })

        chai.expect(todayPrevisions.date.getDay()).eql(actualDate.getDay())
    })

    it("Places by coordinates", async () => {
        const places = await apiDAO.findRestaurantCoordinate(47.21725, -1.55336, 3000)
        
        chai.expect(places).is.an('array')
        places.forEach(it => {
            chai.expect(it).instanceOf(Place)
            chai.expect(it).not.contain.keys("photos")
        })
    })

    it("Place by placeID", async () => {
        const place = await apiDAO.findRestaurantPlaceId("ChIJe7OX9JnuBUgRPihikvg1tZs")
        
        chai.expect(place).instanceOf(Place)
        chai.expect(place).contain.keys("photos")
        chai.expect(place.photos).is.an('array')
        place.photos.forEach(it => {
            chai.expect(it).instanceOf(Photo)
            chai.expect(it.getLink()).contain(it.photo_reference, "maps.googleapis.com/maps/api/place/photo", it.width)
        })
    })

    it("Place by placeID from random places by coordinates", async () => {
        const ville = await apiDAO.findLocationVille("Lyon")
        const places = await apiDAO.findRestaurantCoordinate(ville.coords.latitude, ville.coords.longitude, 1000)
        const randomPlace = Math.floor((Math.random() * (places.length - 1)))
        debugLog("place_id used: " + places[randomPlace].place_id)
        const place = await apiDAO.findRestaurantPlaceId(places[randomPlace].place_id)
        
        chai.expect(place.place_id).eql(places[randomPlace].place_id)
    })

    it("Logging user", async () => {
        const resp = await fetchUsingAgent("http://localhost:3003/user/loulou/loulou")
        const user_exist = await resp.json()
        
        if(user_exist.login == undefined) {
            throw new Error("User loulou not find in database")
        } else {
            debugLog(user_exist)
            debugLog("User find: " + user_exist.login)
        }

        const apiLogin = await apiDAO.findConnexion("loulou", "loulou")

        chai.expect(apiLogin).instanceOf(User)
        chai.expect(apiLogin.login).eql("loulou")
        chai.expect(apiLogin.favorites.length).eql(2)
    })

    it("User favoris", async () => {
        const favoris = await apiDAO.findFavorisByLogin("loulou")
        
        debugLog(favoris)
        chai.expect(favoris).is.an('array')
        chai.expect(favoris.length).eql(2)
        chai.expect(favoris).contain.all("ChIJVzuqS6HuBUgRiH1RPUyBffg", "resto")
    })

    it("Add user", async () => {
        const addedUser = await apiDAO.addUser({
            login: "testUser",
            password: "testPassword",
            email: "testUser@testmail.com"
        })
        debugLog(addedUser)
    })

    it("Add favoris", async () => {
        const addedFavord = await apiDAO.addFavoris()
    })
})

function debugLog(msg) {
    if(debugMode) {
        console.log(msg);
    }
}