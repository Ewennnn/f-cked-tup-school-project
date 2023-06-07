import Joi from "joi"

export const APIJoiConfig = {
    swaggerOptions: {
        info: {
            title: "Best-Dates API",
            version: "0.0.1-SNAPSHOT"
        },
    },

    error: Joi.object({
        code: Joi.number().required().description("Code of returned error"),
        message: Joi.string().required().description("Error message")
    }).description("Error service message"),
}