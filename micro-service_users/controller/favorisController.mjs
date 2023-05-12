'use strict'

import { favorisDao } from "../dao/favorisDao.mjs"

export const favorisController = {
    findAll : async () =>  favorisDao.findAll(),
//     // findByLogin : async (login) => favorisDao.findByLogin(login),
//     // deleteByLogin: async (login) => favorisDao.deleteByLogin(login),
    deleteFavoris : async () => favorisDao.deleteFavoris(),
    add:async (user) => favorisDao.add(favorite),
    save:async(user) => favorisDao.save(favorite),
//     // update: async (login, user) => favorisDao.update(login,user)
}