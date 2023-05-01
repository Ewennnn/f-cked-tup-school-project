import Joi from "joi"

export const WeatherJoiConfig = {
    swaggerOptions: {
        info: {
            title: "Api meteo",
            version: "0.0.1-SNAPSHOT"
        },
        // swaggerUIPath: '/api/meteo/',
        // jsonPath: '/api/meteo/swagger.json'
    },

    error: Joi.object({
        message: Joi.string().required().description("Error message")
    }).description("Error service message"),
}