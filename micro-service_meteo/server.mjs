'use strict';

import Joi from 'joi';
import Hapi from '@hapi/hapi';
import {weatherController} from "./controller/weatherController.mjs";
import { WeatherJoiConfig } from './joiConfig.mjs';
import { weatherExportModel } from './model/WeatherExport.mjs';
import inert from '@hapi/inert';
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'

const routes =[
    {
        method: 'GET',
        path: '/test',
        handler: async (req, res) => {
            return res.response(await weatherController.findCopyDataOfMeteoConcept())
        } 
    },
    {
        method: 'GET',
        path: '/previsions/{code_insee}',
        options: {
            description: 'Get weather predictions for 14 next days.',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    code_insee: Joi.number().required()
                })
            },
            response: {
                status: {
                    200: weatherExportModel,
                    400: WeatherJoiConfig.error
                }
            }
        },
        handler: async (req, res) => {
            return res.response(await weatherController.findPrevisionsByInsee(parseInt(req.params.code_insee)))
        }
    }
]

const server = Hapi.server({
    port: 3001,
    host: 'localhost'
});

server.route(routes);

export const init = async () => {

    await server.initialize();
    return server;
};

export const start = async () => {
    await server.register([
        inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: WeatherJoiConfig.swaggerOptions
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



