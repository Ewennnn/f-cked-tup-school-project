'use strict';

import Hapi from '@hapi/hapi';
import {userController} from "./controller/userController.mjs";

const routes =[
    {
        method: 'GET',
        path: '/user',
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response(await userController.findAll()).code(200)
        }
    },
    {
        method: 'GET',
        //une route avec un parametre
        //utilisable avec request.params.login
        path: '/user/{login}',
        handler: async (request, h) => {
            const user = await userController.findByLogin(request.params.login)
            if (user!=null)
                return h.response(user).code(200)
            else
                return h.response({message: 'not found'}).code(404)
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: async (request, h) => {
            //Le body est accessible via request.payload
            const userToAdd = request.payload
            const user = await userController.add(userToAdd)
            if (user!=null)
                return h.response(user).code(201)
            else
                return h.response({message: 'already exist'}).code(400)
        }
    },
    {
        method: 'DELETE',
        path: '/user/{login}',
        handler: async (request, h) => {

            const user = await userController.deleteByLogin(request.params.login)
            if (user!=null)
                return h.response(user).code(200)
            else
                return h.response({message: 'not found'}).code(404)
        }
    },
    {
        method: 'PUT',
        path: '/user/{login}',
        handler: async (request, h) => {
            const user = await userController.update(request.params.login,request.payload)
            if (user!=null)
                return h.response(user).code(200)
            else
                return h.response({message: 'not found'}).code(400)
        }
    }
]

const server = Hapi.server({
    port: 3000,
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



