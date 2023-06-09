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
import Favoris from '../API/model/Favorite.mjs';

const joiFavoriteWithoutUsers = Joi.object({
    // date: Joi.date(),
    placeId : Joi.string().required()
})

const joiUser = Joi.object({
    login: Joi.string().required(),
    // password: Joi.string().required(),
    email: Joi.string().required()
})

const joiFavorite = Joi.object({
    users : Joi.array().items(joiUser),
    placeId : Joi.string()
})

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
            let users =  await userController.findAllWithoutSalt()
            users.forEach(it => {
                delete it.password
            })
            return h.response(users).code(200)
        }
    },
    {
        method: 'GET',
        //une route avec un parametre
        //utilisable avec request.params.login
        path: '/user/{login}/{password}',
        options: {
            description: 'Retourne l utilisateur qui a le login donné en paramètre',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    login: Joi.string().required(),
                    password : Joi.string().required()
                })
            },
            response: {
                status: {
                    200: joiUserWithFavoris.description("un User qui a le login et password qu on lui a passé en paramètre"),
                    404: UserJoiConfig.error,
                    // 400: UserJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try {
                const user = await userController.findByLogin(request.params.login)
                // delete user.salt
                if (user!=null){
                    const passwordAuth = User.checkPassword(request.params.password, user.salt)
                    if(user.password == passwordAuth){
                        delete user.salt
                        delete user.password
                        delete user.favorites.forEach(favoris => {
                            delete favoris.users
                        });
                        return h.response(user).code(200)
                    }
                }
                return h.response({message: "User not found", code: 400}).code(400)
            } catch (e) {
                return h.response({message: "Error in processus", code: 404}).code(404)
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
                    200 : Joi.array().items(joiFavorite).description("un tableau de favoris")
                }
            }
        },
        handler: async (request, h) => {
            return h.response(await favorisController.findAll()).code(200)
        }
    },
    {
        method: 'GET',
        //une route avec un parametre
        //retourne les favoris lié à un login
        path: '/favoris/{login}',
        options: {
            description: 'Retourne les favoris lié au login donné en paramètre',
            tags: ["api"],
            validate: {
                params: Joi.object({
                    login: Joi.string().required()
                })
            },
            response: {
                status: {
                    200: Joi.array().items(joiFavoriteWithoutUsers.description("les Favoris lié au login passé en paramètre")),
                    404: UserJoiConfig.error
                }
            }
        },
        handler: async (request, h) => {
            try {
                console.log("Trying to resolve favoris of", request.params.login);
                const favoris = await userController.findFavoritesByLogin(request.params.login)

                return h.response(favoris).code(200)
            }catch (e) {
                console.error(e);
                return h.response({message: "User not found", code: 404}).code(404)
            }
        }
    },
    {
        method: 'POST',
        path: '/user',
        options: {
            validate: {
                payload: joiUserWithoutFavoris,  
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
                let param
                try {
                    param = JSON.parse(request.payload)
                } catch(e) {
                    param = request.payload
                }
                const userToAdd = new User(param)
                console.log("Create new user: ", userToAdd.login);
                const user = await userController.save(userToAdd)
                delete user.salt
                delete user.password
                if (user!=null) {
                    console.log(user.login, "successfully created");
                    return h.response(user).code(200)
                }
            } catch (e) {
                console.error(e)
                return h.response({message: "already exist", code: 400}).code(400)
            }
        }
        
    },
    {
        method: 'POST',
        path: '/favoris',
        options: {
            validate: {
                payload: joiFavorite
            },
            description: 'Crée un Favoris en base de donnée',
            tags: ["api"],
            response: {
                status: {
                    200: Joi.array().items(joiFavorite).description("Crée un Favoris"),
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
                console.log("Trying to delete user:", request.params.login);
                const user = await userController.deleteByLogin(request.params.login)
                delete user.salt
                delete user.password
                if (user!=null) {
                    console.log(user.login, "successfully deleted");
                    return h.response(user).code(202)
                }
                throw new Error("User is not deleted")
            } catch (e) {
                console.error(e);
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
        method: 'DELETE',
        path: '/favorisUser',
        options: {
            description: 'Supprime le lien entre un user et un favorite',
            tags: ["api"],
            response: {
                status: {
                    202: joiUserWithFavoris.description("un User qui a le login qu on lui a passé en paramètre"),
                    404: UserJoiConfig.error
                }
            },
            validate: {
                payload : Joi.object({
                    login : Joi.string().required(),
                    placeId : Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {

            try {
                const login = request.payload.login
                const placeId = request.payload.placeId
                const favoris = new Favoris({placeId : placeId})
                const user = new User({login : login})
                let userModify = await userController.deleteFavorites(user,favoris)
                delete userModify.salt
                delete userModify.password
                if (user!=null) {
                    console.log(userModify.login, "successfully deleted");
                    return h.response(userModify).code(202)
                }
                throw new Error("User is not deleted")
            } catch (e) {
                console.error(e);
                return h.response({message: e.meta.cause, code: 404}).code(404)
            }
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
                payload: joiUserWithoutFavoris.required()/*Joi.object({
                    user: joiUserWithoutFavoris.required()
                })*/
            }
        },
        handler: async (request, h) => {
            try{
                const user = await userController.update(request.params.login,request.payload)
                if(user == null){
                    console.log("testttttttt");
                }
                delete user.salt
                delete user.password
                return h.response(user).code(200)
            }catch(e){
                return h.response({message: 'not founds', code: 400}).code(400)
            }  
        }
    },
        {
        method: 'PUT',
        path: '/favoris/{login}',
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
                payload: joiFavoriteWithoutUsers.required()
            }
        },
        handler: async (request, h) => {
            try{
                const login = request.params.login
                const user = await userController.findByLogin(login)
                const userModify = await userController.addFavorites(user, request.payload)
                delete userModify.salt
                delete userModify.password
                return h.response(userModify).code(200) 
            }catch(e){
                return h.response({message: 'Ce favoris est déjà présent chez le user', code: 400}).code(400)
            }
        }
    },
    {
        method: 'PUT',
        path: '/favoris/delete/{login}',
        options: {
            description: 'supprime un favoris à un utilisateur qui a le login en paramètre',
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
                payload: joiFavoriteWithoutUsers.required()
            }
        },
        handler: async (request, h) => {
            try{
                const login = request.params.login
                const user = await userController.findByLogin(login)
                const userModify = await userController.deleteFavorites(user, request.payload)
                delete userModify.salt
                delete userModify.password
                return h.response(userModify).code(200) 
            }catch(e){
                return h.response({message: 'Ce favoris n est pas présent chez le user.', code: 400}).code(400)
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



