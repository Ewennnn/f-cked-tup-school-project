'use strict'
import User from '../model/user.mjs'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

//pour simuler notre bd
class Users {
    users = []
}
//pas de bd uniquement en mémoire
const model = new Users()

export const userDao = {
        //tous les utilisteurs
        findAll : async() => (
            await prisma.user.findMany({
                include : {
                    favorites : true
                }
            })
        ).map(elt => new User(elt)),

        //ajout un utilisateur
        //renvoie l'utilisateur ajouté ou null sinon
        findByLogin : async(login) => {
            const elt = await prisma.user.findUnique({where: {login: login}, include : {favorites : true}}) 
            return elt == null ? null : new User(elt)
        },
        //Supprime tous les users ne renvoie rien
        deleteUsers: async() => {
            await prisma.favorite.deleteMany()
            return await prisma.user.deleteMany()

        },
        //supprime un utilisateur ne renvoie rien
        deleteByLogin: async(login) => {
            const elt = await prisma.user.delete({where : {login : login}})
            return new User(elt)
        }
        ,
        //ajout un utilisateur
        //renvoie l'utilisateur ajouté ou null si il était déjà présent
        add: async (user) => {
            try{
                const elt = await prisma.user.create({
                    data : user
                })
                return new User(elt)
            }
            catch(e) {return Promise.reject(e)}
        },
        save : async (user) => {
            try {
                const param = {...user} //clone
                delete param.favorites
                await prisma.user.create({
                    data: param
                })
    
                const userAdded = await userDao.findByLogin(user.login)
                return userAdded
            } catch (e) {
                return Promise.reject(e)
            }
        },
            //renvoie la liste des favoris de l'utilisateur
    addFavorites: async (userAdded, favoritesToAdd) => {
        try {


            delete favoritesToAdd.users
            userAdded.favorites.push(favoritesToAdd)
            const res = await  prisma.user.update ({
                data : {
                    favorites: {
                        connectOrCreate: {
                            where: {
                              placeId: favoritesToAdd.placeId,
                            },
                            create: {
                                placeId : favoritesToAdd.placeId
                            },
                    }
                }},
                where : {
                    login : userAdded.login
                },
                include : {
                    favorites : true
                }
        })
            return res
        } catch (e) {
            return Promise.reject(e)
        }
    },
    
        //Modifie un utilisateur
        //premd en paramètre le login du user à modifier et la modification
        //renvoie le user modifier ou null
        update: async(login, user) => {
            if(user.password){
                let hash = ""
                let salt  = ""
                salt = bcrypt.genSaltSync()
                hash = bcrypt.hashSync(user.password, salt)
                user.password = hash
                user.salt = salt
            }
            try {
                const elt = await prisma.user.updateMany({
                    where: {
                        login : login,
                        
                    },
                    data: user
                })
    
                return await userDao.findByLogin(login)
            } catch (e) {
                return Promise.reject(e)
            }
        }
}