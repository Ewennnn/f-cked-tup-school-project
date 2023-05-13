import Joi from "joi";
import Place, { placeModel } from "./place.mjs";
import Coordinates from "./Coordinates.mjs";

export const placesExportModel = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  location: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number()
  }).required(),
  rating: Joi.number().required(),
  types: Joi.array().items(Joi.string()).required(),
  user_rating_total: Joi.number().required(),
  vicinity: Joi.string().required(),
});

export default class PlacesExport {
  place_id;
  name;
  location;
  rating;
  types;
  user_rating_total;
  vicinity;

  constructor(obj) {
    try {
      this.place_id = obj.place_id;
      this.name = obj.name;
      this.location = new Coordinates({
        latitude: obj.geometry.location.lat,
        longitude: obj.geometry.location.lng,
      });
      this.rating = obj.rating;
      this.types = obj.types;
      this.user_rating_total = obj.user_ratings_total;
      this.vicinity = obj.vicinity;
    } catch (e) {
      if (e instanceof TypeError) {
        this.location = obj.geometry.location;
        this.place = obj.place;
      }
    }
  }

  json() {
    return JSON.stringify(this);
  }
}