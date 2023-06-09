'use strict';

import Hapi from '@hapi/hapi';
import  Joi from 'joi';
import { ports } from '../microServices.config.mjs';
import { apiController } from './controller/apiController.mjs';
import { APIJoiConfig } from './joiConfig.mjs';
import inert from '@hapi/inert';
import vision from '@hapi/vision'
import swagger from 'hapi-swagger'
import User from './model/User.mjs';

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

const joiUserConnexion = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
})

const joiFavorite = Joi.object({
    users : Joi.array().items(joiUser),
    placeId : Joi.string()
})


const joiFavoriteWithoutUsers = Joi.object({
    // date: Joi.date(),
    placeId : Joi.string().required()
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
        options: {
            description: 'Test logs',
            tags: ["api"],
            response: {
                status: {
                    200: Joi.array()
                }
            }
        },
        handler: async (request, h) => {
            const ville = request.params.ville
            const date = request.params.date || new Date(Date.now()).toLocaleDateString("en")
            return h.response(await apiController.generateDates(ville, date)).code(200)
        }
    },
    {
        method: 'POST',
        path: '/connexion',
        options: {
            validate: {
                payload: joiUserConnexion
            },
            description: 'Permet de récupérer un user',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("Le user a bien été récupéré"),
                    404 : APIJoiConfig.error.description("Problème de récupération"),
                    500 : APIJoiConfig.error.description("An internal server error occurred")
                }
            }
        },
        handler: async (request, h) => {
            try{
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
                const result = await apiController.findConnexion(user.login, user.password)
                if(result instanceof User){
                    return h.response(await apiController.findConnexion(user.login,user.password)).code(200)
                }
                return h.response({message: "Pas de user de trouvé", code : 404}).code(404)
            }catch(e){
                return h.response({message : "An internal server error occurred", code : 500}).code(500)
            }
        }
    },
    {
        method : 'POST',
        path: '/register',
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
    // {
    //     method: 'POST',
    //     path: '/favoris',
    //     options: {
    //         validate: {
    //             payload: joiFavoriteWithoutUsers
    //         },
    //         description: 'Crée un Favoris en base de donnée',
    //         tags: ["api"],
    //         response: {
    //             status: {
    //                 200: Joi.array().items(joiFavorite).description("Crée un Favoris"),
    //                 400 : Joi.object({
    //                     code: Joi.number().required().description("Code of returned error"),
    //                     message: Joi.string().required().description("Error message")
    //                 }).description("Le favoris existe déjà"),
    //                 500: APIJoiConfig.error
    //             }
    //         }
    //     },
    //     handler: async (request, h) => {
    //         try{
    //         //Le body est accessible via request.payload
    //         const favorisToAdd = request.payload
    //         const favoris = await apiController.addFavoris(favorisToAdd)
    //         if (favoris!=null)
    //             return h.response(favoris).code(200)
    //         else
    //             return h.response({message: 'already exist'}).code(400)
    //         }catch(e){
    //             return h.response({message: e, code: 500}).code(500)
    //         }
    //     }
        
    // },
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
        },
        method: 'POST',
        path: '/favoris',
        options: {
            description: 'rajoute un favoris  à un utilisateur',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("Le User qui a eu un nouveau favoris"),
                    400: APIJoiConfig.error
                }
            },
            validate: {
                // params: Joi.object({
                //     login: Joi.string().required()
                // }),
                payload: Joi.object({
                    placeId : Joi.string().required(),
                    login : Joi.string().required(),
                }) 
            }
        },
        handler: async (request, h) => {
            try{
                const login = request.payload.login
                const userModify = await apiController.addFavoritesUser(login, request.payload.placeId)
                return h.response(userModify).code(200) 
            }catch(e){
                return h.response({message: 'Ce favoris est déjà présent chez le user', code: 400}).code(400)
            }
        },
        method: 'POST',
        path: '/deleteFavorisUser',
        options: {
            description: 'supprime le lien d\'un favoris  à un utilisateur',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("Le User qui a eu un favoris en moins"),
                    400: APIJoiConfig.error
                }
            },
            validate: {
                // params: Joi.object({
                //     login: Joi.string().required()
                // }),
                payload: Joi.object({
                    placeId : Joi.string().required(),
                    login : Joi.string().required(),
                }) 
            }
        },
        handler: async (request, h) => {
            try{
                const login = request.payload.login
                const userModify = await apiController.deleteFavoritesUser(login, request.payload.placeId)
                return h.response(userModify).code(200) 
            }catch(e){
                return h.response({message: 'Ce favoris n\'est pas présent chez le user', code: 400}).code(400)
            }
        },
        
        

        
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
    await server.register([inert, vision,
        {
            plugin : swagger,
            options : APIJoiConfig.swaggerOptions
        }])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



