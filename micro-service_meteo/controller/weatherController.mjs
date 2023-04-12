'use strict'
import fetch from "node-fetch";
import {weatherDao} from "../dao/weatherDAO.mjs";
import Weather from "../model/Weather.mjs";

const concept_meteo_api_url = "https://api.meteo-concept.com/api/forecast/daily/periods?token=88d6c1c0be7285f96204e8ade453ea263a5518c850e3e54b7223a627dd78471c&insee="

export const weatherController = {

    findPrevisionsByInsee : async (code_insee) => {
        // const response = await fetch(concept_meteo_api_url + String(code_insee))
        // const content = await response.json()
        // console.log(content);
        // console.log(content.forecast[0]);

        // let allWeather = []
        // content.forecast.forEach(element => {
        //     allWeather.push(element)
        // });
        console.log(new Weather({
            insee: '44109',
            cp: 44000,
            latitude: 47.2316,
            longitude: -1.5483,
            day: 0,
            period: 0,
            datetime: '2023-04-12T02:00:00+0200',
            temp2m: 12,
            wind10m: 30,
            gust10m: 61,
            dirwind10m: 225,
            rr10: 4.3,
            rr1: 8.5,
            probarain: 100,
            weather: 210,
            probafrost: 0,
            probafog: 0,
            probawind70: 0,
            probawind100: 0,
            gustx: 72
        }));
        // for (let i = 0; i < content.forecast.length; i++) {
        //     console.log(content.forecast[i]);
        // }
    },
    findShortTemperature : async (coordinates) => {throw new Error("Not implemented")},

    findFullWeather : async (coordinates) => {throw new Error("Not implemented")},
    findShortWeather : async (coordinates) => {throw new Error("Not implemented")},

    findCompletePrevisions : async (coordinates) => {throw new Error("Not implemented")}
}


weatherController.findPrevisionsByInsee(44109)