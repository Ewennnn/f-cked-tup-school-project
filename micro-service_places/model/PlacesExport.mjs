import Joi from "joi";

export const placesExportModel = Joi.object({
  place_id: Joi.string().required(),
  name: Joi.string().required(),
  location: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number()
  }).required(),
  rating: Joi.number().optional(),
  types: Joi.array().items(Joi.string()).required(),
  user_rating_total: Joi.number().required(),
  vicinity: Joi.string().required(),
});
export const arrayPlacesExportModel = Joi.array().items(placesExportModel)

export default class PlacesExport {
  place_id;
  name;
  location;
  rating;
  types;
  user_rating_total;
  vicinity;

  constructor(obj) {
    this.place_id = obj.place_id;
    this.name = obj.name;
    this.location = {
      latitude: obj.geometry.location.lat,
      longitude: obj.geometry.location.lng,
    };
    this.rating = obj.rating;
    this.types = obj.types;
    this.user_rating_total = obj.user_ratings_total;
    this.vicinity = obj.vicinity;
  }

  json() {
    return JSON.stringify(this);
  }
}