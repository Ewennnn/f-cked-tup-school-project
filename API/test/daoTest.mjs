'use strict'
import chai from "chai"
import Photo from "./../model/place/Photo.mjs"
import Place from "./../model/place/Place.mjs"
import Location from "../model/location/Location.mjs"
import fetchUsingAgent from "../../microServices.config.mjs"
import BestDate from "../model/BestDate.mjs"
import Weather from "../model/Weather.mjs"
import { apiDAO } from "../dao/apiDAO.mjs"

let data = await apiDAO.findLocationCodeInsee(44109)

console.log(data);

data = await apiDAO.findLocationCoordiante(47.2,-1.5483)

console.log(data);
