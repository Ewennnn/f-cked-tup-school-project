'use strict';

import Joi from 'joi';
import Hapi from '@hapi/hapi';
import { placeController } from "./controller/placeController.mjs";
import { PlacesJoiConfig } from "./joiConfig.mjs"
import inert from '@hapi/inert';
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'
import { ports } from '../microServices.config.mjs';
import { placesExportModel } from './model/PlacesExport.mjs';

const routes =[
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.response('<h1>Test micro-service places</h1>')
        }
    },
    {
        method: 'GET',
        path: '/restaurants/{latitude}/{longitude}/{radius}',
        options: {
            description: 'Get the restaurants around the location',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    radius: Joi.number().integer().required()
                }).description('Required format : /latitude/longitude/radius')
            },
            // response: {
            //     status: {
            //         200: placesExportModel,
            //         400: PlacesJoiConfig.error
            //     }
            // }
        },
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response(await placeController.findRestaurantsByLocation({lat: parseFloat(request.params.latitude), lng: parseFloat(request.params.longitude)}, parseInt(request.params.radius)))
        }
    }
]

const server = Hapi.server({
    port: ports.places,
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

export  const start = async () => {
    await server.register([
        inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: PlacesJoiConfig.swaggerOptions
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