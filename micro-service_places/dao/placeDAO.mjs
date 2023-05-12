'use strict'
import Place from '../model/place.mjs'
import fetch from 'node-fetch'

const GOOGLE_MAPS_API_KEY = 'AIzaSyCbMInaYLcbo9HZzZ4Eg3kBxkz2lnWO1N0'

//pour simuler notre bd
// class Places {
//     places = []
// }

//pas de bd uniquement en mémoire
const model = new Place()

export const placeDAO = {
    // Récupère les informations sur les restaurants dans un rayon donné autour d'une localisation
    findRestaurantsByLocation: async (location, radius) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === 'OK') {
        // console.log(data.results);
        return data.results
      } else {
        return {message: "error"}
      }

    },

    // Récupère les détails sur un restaurant à partir de son place_id
    findRestaurantDetails: async (placeId) => {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${GOOGLE_MAPS_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        if (data.status === 'OK') {
            return data.results
        } else {
            throw new Error('Failed to fetch restaurant details')
        }
    }
  }
  