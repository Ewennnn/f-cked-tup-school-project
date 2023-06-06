'use strict';

import Hapi from '@hapi/hapi';
import { ports } from '../microServices.config.mjs';
import { locationController } from './controller/locationController.mjs';
import inert from '@hapi/inert'
import vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger'
import { LocationJoiConfig } from './joiConfig.mjs';
import Joi from 'joi';
import { locationModel } from './model/Location.mjs';

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (req, h) => {
            return h.response("<h1>Welcome to location service</h1>")
        }
    },
    {
        method: 'GET',
        path: '/code_insee/{code_insee}',
        options: {
            description: 'Get city informations from his insee code',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    code_insee: Joi.number().min(10000).max(99999).required()
                }),
                failAction: (request, h, err) => {
                    console.error(`Requête entrante: ${request.method.toUpperCase()} ${request.url.pathname} ${JSON.stringify(request.params)}`);
                    console.error(err.details)
                    return h.response({code: err.output.statusCode, message: err.output.payload.message}).code(err.output.statusCode).takeover()
                }
            },
            response: {
                status: {
                    200: locationModel,
                    400: LocationJoiConfig.error
                }
            }
        },
        handler: async (req, h) => {
            const resp = await locationController.findLocationByInsee(parseInt(req.params.code_insee))
            if (resp.code) {
                return h.response(resp).code(resp.code)
            }
            return h.response(resp).code(200)
        }
    },
    {
        method: 'GET',
        path: '/coords/{latitude}/{longitude}',
        options: {
            description: 'Get city informations from his decimals coordinates',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    latitude: Joi.number().min(-90).max(90).required(),
                    longitude: Joi.number().min(-180).max(180).required()
                }),
                failAction: (request, h, err) => {
                    console.error(`Requête entrante: ${request.method.toUpperCase()} ${request.url.pathname} ${JSON.stringify(request.params)}`);
                    console.error(err.details)
                    return h.response({code: err.output.statusCode, message: err.output.payload.message}).code(err.output.statusCode).takeover()
                }
            },
            response: {
                status: {
                    200: locationModel,
                    400: LocationJoiConfig.error,
                    404: LocationJoiConfig.error
                }
            }
        },
        handler: async (req, h) => {
            const resp = await locationController.findLocationByCoordinates(parseFloat(req.params.latitude), parseFloat(req.params.longitude))
            if (resp.code) {
                return h.response(resp).code(resp.code)
            }
            return h.response(resp).code(200)
        }
    },
    {
        method: 'GET',
        path: '/city/{city}',
        options: {
            description: 'Get city informations from his decimals coordinates',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    city: Joi.string().required()
                }),
                failAction: (request, h, err) => {
                    console.error(`Requête entrante: ${request.method.toUpperCase()} ${request.url.pathname} ${JSON.stringify(request.params)}`);
                    console.error(err.details)
                    return h.response({code: err.output.statusCode, message: err.output.payload.message}).code(err.output.statusCode).takeover()
                }
            },
            response: {
                status: {
                    200: locationModel,
                    400: LocationJoiConfig.error,
                }
            }
        },
        handler: async (req, h) => {
            let city = new String(req.params.city)
            city = city.charAt(0).toUpperCase() + city.slice(1);

            const resp = await locationController.findLocationByCity(city)
            if (Array.isArray(resp.cities)) {
                return h.response({code: 400, message: "No matching city found"}).code(400)
            }
            return h.response(resp).code(200)
        }
    }
]

const server = Hapi.server({
    port: ports.location,
    host: 'localhost',
    debug: {
        request: ['error']
    }
});

server.route(routes);

export const init = async () => {
    await server.initialize();
    return server;
};

export const start = async () => {
    await server.register([
        inert,
        vision,
        {
            plugin: HapiSwagger,
            options: LocationJoiConfig.swaggerOptions
        }
    ])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



