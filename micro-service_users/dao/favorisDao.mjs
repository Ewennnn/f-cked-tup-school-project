'use strict'
import Favorite from '../model/favorite.mjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//pour simuler notre bd
class Favorites {
    favorites = []
}
//pas de bd uniquement en mémoire
const model = new Favorites()


export const favorisDao = {
        //tous les utilisteurs
        findAll : async() => (
            await prisma.favorite.findMany({include : {users : true}})
        ).map(elt => new Favorite(elt)),

        //ajout un utilisateur
        //renvoie l'utilisateur ajouté ou null sinon
        // findByLogin : async(login) => {
        //     const elt = await prisma.user.findUnique({where: {login: login}}) 
        //     return elt == null ? null : new User(elt)
        // },
        //Supprime tous les users ne renvoie rien
        deleteFavoris: async() => {await prisma
            .favorite
            .deleteMany()

        },
        //supprime un utilisateur ne renvoie rien
        // deleteByLogin: async(login) => 
        //     await prisma.deleteByLogin(login)
        // ,
        //ajout un utilisateur
        //renvoie l'utilisateur ajouté ou null si il était déjà présent
        add: async (favorite) => {
            try{
                const elt = await prisma.favorite.create({
                    data : favorite
                })
                return new Favorite(elt)
            }
            catch(e) {return Promise.reject(e)}
        },
        save : async (favorite) => {
            try {
                const param = {...favorite} //clone
                delete param.user
                await prisma.favorite.create({
                    data: param
                })
    
                const favoriteAdded = await favorisDao.findAll()[-1]
                return favoriteAdded
            } catch (e) {
                return Promise.reject(e)
            }
        },
            //renvoie la liste des favoris de l'utilisateur
    // addFavorites: async (userAdded, favoritesToAdd) => {
    //     try {
    //         userAdded.favorites.push(favoritesToAdd)
    //         const res = await  prisma.user.update ({
    //             data : {
    //                 favorites: {
    //                     create : userAdded.favorites
    //                 }
    //             },
    //             where : {
    //                 login : userAdded.login
    //             }
    //         })
    //     } catch (e) {
    //         return Promise.reject(e)
    //     }
    // },
    
        //Modifie un utilisateur
        //premd en paramètre le login du user à modifier et la modification
        //renvoie le user modifier ou null
        // update: async(login, user) => {
        //     try {
        //         const elt = await prisma.user.updateMany({
        //             where: {
        //                 login : login,
                        
        //             },
        //             data: user
        //         })
    
        //         return await userDao.findByLogin(login)
        //     } catch (e) {
        //         return Promise.reject(e)
        //     }
        // }
}