'use strict'
import PlaceExport from '../model/PlaceExport.mjs'
import PlacesExport from '../model/PlacesExport.mjs'
import fetch from 'node-fetch'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCbMInaYLcbo9HZzZ4Eg3kBxkz2lnWO1N0'

export const placeDAO = {
    // Récupère les informations sur les restaurants dans un rayon donné autour d'une localisation
    findRestaurantsByLocation: async (location, radius) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === 'OK') {
        // console.log(data.results);
        return await data.results.map(it => new PlacesExport(it))
      } else {
        return {message: "error"}
      }

    },

    // Récupère les détails sur un restaurant à partir de son place_id
    findRestaurantDetails: async (place_id) => {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_MAPS_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        if (data.status === 'OK') {
          // console.log(data.result);
          return new PlaceExport(data.result)
        } else {
            throw new Error('Failed to fetch restaurant details')
        }
    }
  }
  