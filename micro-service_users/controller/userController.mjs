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
    findByLogin : async (login) => userDao.findByLogin(login),
    deleteByLogin: async (login) => userDao.deleteByLogin(login),
    add:async (user) => userDao.add(user),
    save:async(user) => userDao.save(user),
    update: async (login, user) => userDao.update(login,user),
    deleteAll: async () => userDao.deleteUsers(),
    addFavorites: async (user,favoris) => userDao.addFavorites(user,favoris)
}