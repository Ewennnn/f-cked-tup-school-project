'use strict'
import User from '../model/user.mjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//pour simuler notre bd
class Users {
    users = []
}
//pas de bd uniquement en mémoire
const model = new Users()

// export const userDao = {
//     //tous les utilisteurs
//     findAll : () => model.users,

//     //ajout un utilisateur
//     //renvoie l'utilisateur ajouté ou null sinon
//     findByLogin : (login) => {
//         const users = model.users.filter((user)=>user.login==login)
//         return users.length!=0 ? users[0]:null
//     },
//     //supprime un utilisateur
//     //renvoie l'utilisateur supprimé ou null sinon
//     deleteByLogin: (login) => {
//         const user = userDao.findByLogin(login)
//         if (user==null)
//             return null
//         model.users = model.users.filter((user)=>user.login != user.login)
//         return user
//     },
//     //ajout un utilisateur
//     //renvoie l'utilisateur ajouté ou null si il était déjà présent
//     add: (user) => {
//         const userByLogin = userDao.findByLogin(user.login)
//         if (userByLogin != null)
//             return null
//         model.users.push(user)
//         return user
//     },

//     //Modifie un utilisateur
//     //premd en paramètre le login du user à modifier et la modification
//     //renvoie le user modifier ou null
//     update: (login, user) => {
//         const userByLogin = userDao.findByLogin(login)
//         if (user==null)
//             return null
//         userDao.deleteByLogin(login)
//         userDao.deleteByLogin(user.login)
//         userDao.add(user)
//         return user
//     }
// }

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
        deleteUsers: async() => {await prisma
            .user
            .deleteMany()

        },
        //supprime un utilisateur ne renvoie rien
        deleteByLogin: async(login) => 
            await prisma.deleteByLogin(login)
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
    
                const userAdded =
    
                    await userDao.findByLogin(user.login)
                return userAdded
            } catch (e) {
                return Promise.reject(e)
            }
        },
            //renvoie la liste des favoris de l'utilisateur
    addFavorites: async (userAdded, favoritesToAdd) => {
        try {
            userAdded.favorites.push(favoritesToAdd)
            const res = await  prisma.user.update ({
                data : {
                    favorites: {
                        create : userAdded.favorites
                    }
                },
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