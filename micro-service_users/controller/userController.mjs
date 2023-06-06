'use strict'
import {userDao} from "../dao/userDao.mjs";
export const userController = {
    findAll : async () =>  await userDao.findAll(),
    findAllWithoutSalt : async () => {
        let users = await userDao.findAll()
        users.forEach(it => {
            delete it.salt, 
            it.favorites.forEach(favoris =>{
                delete favoris.users
            })
        })
        return users
    },
    findByLogin : async (login) => await userDao.findByLogin(login),
    deleteByLogin: async (login) => await userDao.deleteByLogin(login),
    add:async (user) => await userDao.add(user),
    save:async(user) => await userDao.save(user),
    update: async (login, user) => await userDao.update(login,user),
    deleteAll: async () => await userDao.deleteUsers(),
    findFavoritesByLogin: async (login) => await userDao.findFavoritesByLogin(login),
    addFavorites: async (user,favoris) => await userDao.addFavorites(user,favoris),
    deleteFavorites: async (user, favoris) => await userDao.deleteFavorites(user,favoris)
}