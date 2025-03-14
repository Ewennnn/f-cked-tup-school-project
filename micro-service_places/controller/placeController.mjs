'use strict'
import { placeDAO } from "../dao/placeDAO.mjs";

export const placeController = {
    findRestaurantsByLocation : async (location, radius) => {
        return await placeDAO.findRestaurantsByLocation(location, radius)
    },
    findRestaurantDetails : async (place_id) => {
        return await placeDAO.findRestaurantDetails(place_id)
    }
}