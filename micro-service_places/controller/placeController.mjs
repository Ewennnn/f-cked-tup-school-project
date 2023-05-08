'use strict'
import { placeDAO } from "../dao/placeDAO.mjs";

export const placeController = {
    findAll : async () =>  placeDAO.findAll(),
    findByLogin : async (login) => placeDAO.findByLogin(login),

    add: async (user) => placeDAO.add(user),
    update: async (login, user) => placeDAO.update(login,user)
}