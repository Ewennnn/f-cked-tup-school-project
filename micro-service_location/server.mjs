'use strict';

import Hapi from '@hapi/hapi';
import { ports } from '../microServices.config.mjs';
import { locationController } from './controller/locationController.mjs';

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (req, res) => {
            return res.response("<h1>Welcome to location service</h1>")
        }
    },
    {
        method: 'GET',
        path: '/code_insee/{code_insee}',
        handler: async (req, res) => {
            return res.response(await locationController.findLocationByInsee(parseInt(req.params.code_insee)))
        }
    },
    {
        method: 'GET',
        path: '/coords/{latitude}/{longitude}',
        handler: async (req, res) => {
            return res.response(await locationController.findLocationByCoordinates(parseFloat(req.params.latitude), parseFloat(req.params.longitude)))
        }
    }
]

const server = Hapi.server({
    port: ports.location,
    host: 'localhost'
});

server.route(routes);

export const init = async () => {

    await server.initialize();
    return server;
};

export  const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



