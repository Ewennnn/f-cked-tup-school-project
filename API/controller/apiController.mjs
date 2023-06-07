'use strict'

import { apiDAO } from "../dao/apiDAO.mjs";

export const apiController = {
    generateDates : async (ville, date) => {
        console.log(ville);
        console.log(date);
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
    addFavoris : async (favoris) => await apiDAO.addFavoris(favoris)
}