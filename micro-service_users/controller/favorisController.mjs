'use strict'

import { favorisDao } from "../dao/favorisDao.mjs"

export const favorisController = {
    findAll : async () =>  {
        let favoris = await favorisDao.findAll()
        console.log(favoris);
        await favoris.forEach(favorises => {
            console.log(favorises.users);
            favorises.users.forEach(user => {
                delete user.favorites
                delete user.salt
                delete user.password
            })
        });
        return favoris
    },
//     // findByLogin : async (login) => favorisDao.findByLogin(login),
//     // deleteByLogin: async (login) => favorisDao.deleteByLogin(login),
    deleteFavoris : async () => favorisDao.deleteFavoris(),
    add:async (user) => favorisDao.add(favorite),
    save:async(user) => favorisDao.save(favorite),
//     // update: async (login, user) => favorisDao.update(login,user)
}