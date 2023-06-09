'use strict'

import { apiDAO } from "../dao/apiDAO.mjs";
import BestDate from "../model/BestDate.mjs";
import Place from "../model/place/Place.mjs";

export const apiController = {
    generateDates : async (ville, date) => {
        console.log(ville);
        console.log(date);
        
        const location = await apiDAO.findLocationVille(ville)
        if (location.code == 400) {
            return []
        }

        const weather = await apiDAO.findPrevisionCodeInseeDate(location.code_insee, date)

        let places = []
        let distance = 1
        do {
            places = await apiDAO.findRestaurantCoordinate(location.coords.latitude, location.coords.longitude, distance++ * 1000)
            console.log("Restaurants radius:", distance * 1000);
        } while(places.length == 0)

        const bestDates = []
        const totalPlaces = places.length
        let generated = 0
        while (generated < 10) {
            const random = Math.floor(Math.random() * totalPlaces)
            if (alreadyIn(bestDates, places[random].place_id)) {
                console.log("already here");
                console.log(generated++)
                continue
            }
            try {
                const place = await apiDAO.findRestaurantPlaceId(places[random].place_id)
                bestDates.push(new BestDate({
                    date: date,
                    location: location,
                    place: place,
                    weather: weather.weather[3]
                }))
            } catch (e) {
                console.log(e);
            }
            console.log(generated++)
        }

        return bestDates
    },
    findLocationCodeInsee : async (code_insee) => await apiDAO.findLocationCodeInsee(code_insee),
    findLocationCoordinate : async (latitude,longitude) => await apiDAO.findLocationCoordinate(latitude,longitude),
    findLocationVille : async (ville) => await apiDAO.findLocationVille(ville),
    findPrevisionCodeInsee : async (code_insee) => await apiDAO.findPrevisionCodeInsee(code_insee),
    findPrevisionCodeInseeDate : async (code_insee,date) => await apiDAO.findPrevisionCodeInseeDate(code_insee,date),
    findRestaurantCoordinate : async (latitude, longitude, radius) => await apiDAO.findRestaurantCoordinate(latitude,longitude,radius),
    findRestaurantPlaceId : async (placeId) => await apiDAO.findRestaurantPlaceId(placeId),
    findConnexion : async (login, password) => await apiDAO.findConnexion(login, password),
    findFavorisByLogin : async (login) => await apiDAO.findFavorisByLogin(login),
    addUser : async (user) => await apiDAO.addUser(user),
    addFavoris : async (favoris) => await apiDAO.addFavoris(favoris),
    addFavoritesUser : async (login, favoris) => await apiDAO.addFavoritesUser(login, favoris)
}

function alreadyIn(array, place_id) {
    let present = false
    array.forEach(it => {
        console.log(it.place.place_id);
        if (it.place.place_id == place_id) {
            present = true
            return
        }
    })
    return present
}