'use strict';

import Hapi from '@hapi/hapi';
import  Joi from 'joi';
import {userController} from "./controller/userController.mjs";
import {favorisController} from './controller/favorisController.mjs';
import { ports } from '../microServices.config.mjs';
import User from './model/user.mjs';
import inert from '@hapi/inert';
import vision from '@hapi/vision'
import swagger from 'hapi-swagger'
import { UserJoiConfig } from './joiConfig.mjs';

const joiFavorite = Joi.object({
    users : Joi.array().items(joiUser),
    placeId : Joi.string()
})

const joiFavoriteAdd = Joi.object({
    date: Joi.date(),
    placeId : Joi.string().required()
})

const joiUser = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
})

const joiUserWithFavoris = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    favorites : Joi.array().items( Joi.object({
        placeId : Joi.string()
    }))
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
        options: {
            description: 'Retourne l ensemble des users en Base de Données',
            tags: ["api"],
            response: {
                status: {
                    // 200: Joi.string()
                    200 : Joi.array().items(joiUserWithFavoris).description("un tableau de User")
                }
            }
        },
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response(await userController.findAllWithoutSalt()).code(200)
        }
    },
    {
        method: 'GET',
        //une route avec un parametre
        //utilisable avec request.params.login
        path: '/user/{login}',
        options: {
            description: 'Retourne l utilisateur qui a le login donné en paramètre',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    login: Joi.string().required()
                })
            },
            response: {
                status: {
                    200: joiUserWithFavoris.description("un User qui a le login qu on lui a passé en paramètre"),
                    404: UserJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = await userController.findByLogin(request.params.login)
                delete user.salt
                if (user!=null)
                    return h.response(user).code(200)
            } catch (e) {
                return h.response({message: "User not found", code: 404}).code(404)
            }
        }
    },
    {
        method: 'GET',
        path: '/favoris',
        options: {
            description: 'Retourne l ensemble des favoris en Base de Données',
            tags: ["api"],
            response: {
                status: {
                    // 200: Joi.string()
                    200 : Joi.array().items(joiFavorite).description("un tableau de favoris")
                }
            }
        },
        handler: async (request, h) => {
            //le message renvoyé et le code http
            return h.response(await favorisController.findAll()).code(200)
        }
    },
    {
        method: 'POST',
        path: '/user',
        options: {
            validate: {
                payload: joiUser
            },
            description: 'Crée un User en base de donnée',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("Crée un User"),
                    400 : UserJoiConfig.error.description("Le user existe déjà"),
                }
            }
        },
        handler: async (request, h) => {
            try{
                //Le body est accessible via request.payload
                const param = request.payload
                const userToAdd = new User(param)
                const user = await userController.save(userToAdd)
                delete user.salt
                if (user!=null)
                    return h.response(user).code(200)
            } catch (e) {
                return h.response({message: "already exist", code: 400}).code(400)
            }
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
                    500: UserJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try{
            //Le body est accessible via request.payload
            const param = request.payload
            const favorisToAdd = new Favoris(param)
            const favoris = await favorisController.save(favorisToAdd)
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
        method: 'DELETE',
        path: '/user',
        options: {
            description: 'Supprime tous les utilisateurs de la base',
            tags: ['api'],
            response: {
                status: {
                    202: Joi.object({
                        count: Joi.number().min(0).required()
                    })
                }
            }
        },
        handler: async (request, h) => {
            return h.response(await userController.deleteAll()).code(200)
        }
    },
    {
        method: 'DELETE',
        path: '/user/{login}',
        options: {
            description: 'Supprime l utilisateur qui a le login en paramètre',
            tags: ["api"],
            response: {
                status: {
                    202: joiUserWithFavoris.description("un User qui a le login qu on lui a passé en paramètre"),
                    404: UserJoiConfig.error
                }
            },
            validate: {
                params: Joi.object({ 
                    login : Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {

            try {
                const user = await userController.deleteByLogin(request.params.login)
                delete user.salt
                if (user!=null)
                    return h.response(user).code(202)
            } catch (e) {
                return h.response({message: e.meta.cause, code: 404}).code(404)
            }
        }
    },
    {
        method: 'DELETE',
        path: '/favoris',
        options: {
            description: 'Supprime les favoris en base',
            tags: ["api"],
            response: {
                status: {
                    200: Joi.array().items(joiFavorite).description("les favoris qui étaient en base"),
                    400: UserJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {

            const favoris = await favorisController.deleteFavoris()
            if (favoris!=null)
                return h.response(favoris).code(200)
            else
                return h.response({message: 'not found'}).code(404)
        }
    },
    {
        method: 'PUT',
        path: '/user/{login}',
        options: {
            description: 'Mets à jour l utilisateur qui a le login en paramètre',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("un User qui a le login qu on lui a passé en paramètre"),
                    400: UserJoiConfig.error
                }
            },
            validate: {
                params: Joi.object({
                    login: Joi.string().required()
                }),
                payload: Joi.object({
                    user : joiUserWithFavoris.required()
                })
            }
        },
        handler: async (request, h) => {
            try{
                console.log(request.params.login);
                console.log(request.payload.user);
                const user = await userController.update(request.params.login,request.payload.user)
                if(user == null){
                    console.log("testttttttt");
                }
                delete user.salt
                return h.response(user).code(200)
            }catch(e){
                return h.response({message: 'not founds', code: 400}).code(400)
            }  
        }
    },
        {
        method: 'PUT',
        path: '/user/favorite/{login}',
        options: {
            description: 'rajoute un favoris à un utilisateur qui a le login en paramètre',
            tags: ["api"],
            response: {
                status: {
                    200: joiUserWithFavoris.description("un User qui a le login qu on lui a passé en paramètre"),
                    400: UserJoiConfig.error
                }
            },
            validate: {
                params: Joi.object({
                    login: Joi.string().required()
                }),
                payload: Joi.object({
                    favoris : joiFavoriteAdd.required()
                })
            }
        },
        handler: async (request, h) => {
            try{
                console.log(request.params.login);
                console.log(request.payload.favoris);
                const login = request.params.login
                const user = await userController.findByLogin(login)
                const userModify = await userController.addFavorites(user, request.payload.favoris)
                delete userModify.salt
                return h.response(userModify).code(200) 
            }catch(e){
                return h.response({message: 'Ce favoris est déjà présent chez le user', code: 400}).code(400)
            }
        }
    }
]

const server = Hapi.server({
    port: ports.users,
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
    await server.register([inert, vision,
    {
        plugin : swagger,
        options : UserJoiConfig.swaggerOptions
    }])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



