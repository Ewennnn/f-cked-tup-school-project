'use strict';

import Hapi from '@hapi/hapi';
import { ports } from '../microServices.config.mjs';

const routes =[
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response('<h1>Welcome to Best-Dates API !<h1>').code(200)
        }
    },
]

const server = Hapi.server({
    port: ports.API,
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
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



