"use strict"

import fetchUsingAgent from '../../microServices.config.mjs'

import chai from "chai"
import Photo from "./../model/place/Photo.mjs"
import Place from "./../model/place/Place.mjs"
import Location from "../model/location/Location.mjs"
import BestDate from "../model/BestDate.mjs"
import Weather from "../model/weather/Weather.mjs"
import User from "../model/User.mjs"
import WeatherExport from '../model/weather/WeatherExport.mjs'
import DailyWeatherExport from '../model/weather/WeatherDailyExport.mjs'
import Favoris from '../model/Favorite.mjs'


export const apiDAO = {
    /**Location */
    /**Retourne une ville par rapport au code insee */
    findLocationCodeInsee : async (code_insee) => {
        const url = "http://localhost:3004/code_insee/" + code_insee
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new Location(body)

        return data
    },
    /**Retourne une ville par rapport à une latitude et longitude */
    findLocationCoordinate : async (latitude,longitude) => {
        const url = "http://localhost:3004/coords/" + latitude + "/" + longitude
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new Location(body)

        return data
    },
    /**Retourne une ville par rapport à un nom de ville */
    findLocationVille : async (ville) => {
        const url = "http://localhost:3004/city/" + ville
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new Location(body)

        return data
    },
    /** Météo */
    /**Retourne la météo par rapport à un code insee */
    findPrevisionCodeInsee : async (code_insee) => {
        const url = "http://localhost:3001/previsions/" + code_insee
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new WeatherExport(body)

        return data
    },
    /**Retoune la météo par rapport au code insee et une date */
    findPrevisionCodeInseeDate : async (code_insee,date) => {
        const url = "http://localhost:3001/previsions/" + code_insee + "/" + new Date(date)
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new DailyWeatherExport(body)

        return data
    },/**Place */
    /**Retourne un restaurant qui a les paramètres (latitude,longitude,radius) */
    findRestaurantCoordinate : async (latitude,longitude,radius) => {
        const url = "http://localhost:3002/restaurants/" + latitude + "/" + longitude + "/" + radius
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }
        if (body.statusCode == 500) {
            return []
        }
        return body.map(it => new Place(it))
    },
    /**Retourne un restaurant qui possède le placeId en paramètre */
    findRestaurantPlaceId : async (placeId) => {
        const url = "http://localhost:3002/restaurants/" + placeId
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new Place(body)

        return data
    },/**User */
    /**Permet de retourner un User si le login et le password correspondent. */
    findConnexion : async (login,password) => {
        const url = "http://localhost:3003/user/" + login + "/" + password
        const response = await fetchUsingAgent(url)
        console.log(response);
        console.log("-----------------------------------------------");
        const body = await response.json()
        if(body.code){
            console.log(body);
            return body
        }

        const data = new User(body)
        delete data.password


        return data
    },
    /**Permet de retourner l'ensemble des Favoris lié à un User par son login. */
    findFavorisByLogin : async (login) => {
        const url = "http://localhost:3003/favoris/" + login
        const response = await fetchUsingAgent(url)
        const body = await response.json()
        if(body.code){
            return body
        }

        // const data = new Favoris(body)

        return body.map(it => new Favoris(it))
    },
    /**Permet de créer un User */

    addUser : async (user) => {
        const url = "http://localhost:3003/user"
        const response = await fetchUsingAgent(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        })
        const body = await response.json()

        if(body.code){
            return body
        }

        const data = new User(body)
        delete data.password

        return data
    },
    addFavoris : async (favoris) => {
        const url = "http://localhost:3003/favoris"
        const response = await fetchUsingAgent(url, {method : "POST", body : favoris} )
        const body = await response.body
        if(body.code){
            return body
        }

        const data = new Favoris(body)

        return data
    },
    addFavoritesUser : async (login,favoris) => {
        const url = "http://localhost:3003/favoris/" + login
        favoris = {placeId : favoris}
        const response = await fetchUsingAgent(url, {method : "PUT", body : JSON.stringify(favoris), headers: {'Content-Type': 'application/json'}} )
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new User(body)

        delete data.password

        return data
    },
    deleteFavoritesUser : async (loginN,placeIdN) => {
        const url = "http://localhost:3003/favorisUser"
        const favoris = {placeId : placeIdN, login : loginN}
        const response = await fetchUsingAgent(url, {method : "DELETE", body : JSON.stringify(favoris), headers: {'Content-Type': 'application/json'}} )
        const body = await response.json()
        if(body.code){
            return body
        }

        const data = new User(body)

        delete data.password

        return data
    },
    findtest : async (code_insee) => {code_insee}
}