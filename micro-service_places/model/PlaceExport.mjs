import Joi from "joi";
import PlacesExport, { placesExportModel } from "./PlacesExport.mjs";

export const placeExportModel = placesExportModel.concat(Joi.object({
  formatted_address: Joi.string().required(),
  international_phone_number: Joi.string().required(),
  photos: Joi.array().items(Joi.object({
    height: Joi.number().required(),
    width: Joi.number().required(),
    photo_reference: Joi.string().required(),
    html_attributions: Joi.array().items(Joi.string()).required()
  })).optional()
})).unknown(true).description("Export model for Google Places API result");

export default class PlaceExport {
  place_id
  name
  location
  rating
  types
  user_rating_total
  vicinity

  formatted_address
  international_phone_number
  photos

  constructor(obj) {
    Object.assign(this, new PlacesExport(obj))
    
    this.formatted_address = obj.formatted_address
    this.international_phone_number = obj.international_phone_number
    this.photos = obj.photos.map(photo => ({
      height: photo.height,
      width: photo.width,
      photo_reference: photo.photo_reference,
      html_attributions: photo.html_attributions
    }))

    console.log(this);
  }

  json() {
    return JSON.stringify(this);
  }
}