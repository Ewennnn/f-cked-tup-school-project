'use strict';

import Hapi from '@hapi/hapi';
import { placeController } from "./controller/placeController.mjs";
import { ports } from '../microServices.config.mjs';

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
        path: '/restaurants',
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response(await placeController.findRestaurantsByLocation({lat: 47.218371, lng: -1.553621}, 3000)).code(200)
        }
    }
]

const server = Hapi.server({
    port: ports.places,
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



