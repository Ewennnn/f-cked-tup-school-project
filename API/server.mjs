'use strict';

import Hapi from '@hapi/hapi';
import  Joi from 'joi';
import { ports } from '../microServices.config.mjs';
import { apiController } from './controller/apiController.mjs';
import { APIJoiConfig } from './joiConfig.mjs';

const joiUserWithFavoris = Joi.object({
    login: Joi.string().required(),
    // password: Joi.string().required(),
    email: Joi.string().required(),
    favorites : Joi.array().items( Joi.object({
        placeId : Joi.string()
    }))
})
const joiUserWithoutFavoris = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
})

const joiUser = Joi.object({
    login: Joi.string().required(),
    email: Joi.string().required()
})


const routes =[
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response('<h1>Welcome to Best-Dates API !<h1>').code(200)
        }
    },
    {
        method: 'GET',
        path: '/generate/{ville}/{date?}',
        handler: async (request, h) => {
            const ville = request.params.ville
            const date = request.params.date || new Date(Date.now()).toLocaleDateString("en")
            return h.response(await apiController.generateDates(ville, date)).code(200)
        }
    },
    {
        method: 'POST',
        path: '/connexion',
        handler: async (request, h) => {
            let user = undefined
            try {
                user = JSON.parse(request.payload)
            } catch(e) {
                user = request.payload
            }
            if (user == undefined) {
                return h.response({message : "Il faut donner un mot de passe et un login"}).code(400)
            }
            console.log("Try connecting user", user.login);
            return h.response(await apiController.findConnexion(user.login,user.password)).code(200)
        }
    },
    {
        method : 'POST',
        path: '/user',
        options: {
            validate: {
                payload: joiUserWithoutFavoris
            },
            description: 'Crée un User en base de donnée',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("Crée un User"),
                    400 : APIJoiConfig.error.description("Le user existe déjà"),
                }
            }
        },
        handler: async (request, h) => {
            const user = request.payload
            const userAdd = await apiController.addUser(user)
            return h.response(userAdd).code(200)
        }
    },
    {
        method: 'POST',
        path: '/favoris',
        options: {
            validate: {
                payload: joiUser
            },
            description: 'Crée un Favoris en base de donnée',
            tags: ["api"],
            response: {
                status: {
                    200: Joi.array().items(joiUser).description("Crée un Favoris"),
                    400 : Joi.object({
                        code: Joi.number().required().description("Code of returned error"),
                        message: Joi.string().required().description("Error message")
                    }).description("Le favoris existe déjà"),
                    500: APIJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try{
            //Le body est accessible via request.payload
            const favorisToAdd = request.payload
            const favoris = await apiController.addFavoris(favorisToAdd)
            if (favoris!=null)
                return h.response(favoris).code(200)
            else
                return h.response({message: 'already exist'}).code(400)
            }catch(e){
                return h.response({message: e, code: 500}).code(500)
            }
        }
        
    },
    {
        method: 'POST',
        path: '/restaurant/{ville}',
        options: {
            validate: {
                payload: Joi.array().items(Joi.date()).description("tableau de date")
            },
            description: 'Crée un Favoris en base de donnée',
            tags: ["api"],
            response: {
                status: {
                    200: Joi.array().items(joiUser).description("Crée un Favoris"),
                    400 : Joi.object({
                        code: Joi.number().required().description("Code of returned error"),
                        message: Joi.string().required().description("Error message")
                    }).description("Le favoris existe déjà"),
                    500: APIJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try{
            //Le body est accessible via request.payload
            const dates = request.payload
            const ville = request.params.ville

            const location = apiController.findLocationVille(ville)
            // const code_insee = location.code_insee


            /**liste de placeId */
            const placeId = apiController.findRestaurantCoordinate(ville.latitude, ville.longitude, 50.0)

            const restaurants = []

            placeId.then(element =>
                apiController.findRestaurantPlaceId(element).then(
                    restaurant => restaurants.push(restaurant)
                ))

            return h.response(restaurants).code(200)
            }catch(e){
                return h.response({message: e, code: 500}).code(500)
            }
        }
        
    }
]

const server = Hapi.server({
    port: ports.API,
    host: 'localhost',
    debug: {
        request: ['error']
    },
    routes: {
        cors: true
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



