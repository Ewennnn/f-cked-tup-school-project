'use strict';

import Hapi from '@hapi/hapi';
import  Joi from 'joi';
import {userController} from "./controller/userController.mjs";
import { ports } from '../microServices.config.mjs';
import User from './model/user.mjs';

const joiUser = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
})

const routes =[
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.response('<h1>Test micro-service users</h1>')
        }
    },
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
        options: {
            validate: {
                payload: joiUser
            }
        },
        handler: async (request, h) => {
            try{
            //Le body est accessible via request.payload
            const param = request.payload
            const userToAdd = new User(param)
            const user = await userController.save(userToAdd)
            if (user!=null)
                return h.response(user).code(201)
            else
                return h.response({message: 'already exist'}).code(400)
            }catch(e){
                return h.response({message: e, code: 500}).code(500)
            }
        }
        
    },
    {
        method: 'DELETE',
        path: '/user/{login}',
        handler: async (request, h) => {

            console.log(request.params.login);
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
            try{
            const user = await userController.update(request.params.login,request.payload)
            if (user!=null)
                return h.response(user).code(200)
            else
                return h.response({message: 'not found'}).code(400)
            }catch(e){
                return h.response({message: "error", code: 500}).code(500)
            }
        }
    }
]

const server = Hapi.server({
    port: ports.users,
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



