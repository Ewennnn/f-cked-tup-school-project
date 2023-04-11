'use strict';

import Hapi from '@hapi/hapi';
import {weatherController} from "./controller/weatherController.mjs";

const routes =[
    {
        method: 'GET',
        path: '/weather',
        handler: async (req, res) => {
            return res.response(await "{message: \"good weather\"}")
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
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



