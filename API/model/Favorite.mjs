'use strict'
import User from "./User.mjs"

export default class Favoris { 
    placeId 
    users

    constructor(obj) {
        this.placeId = obj.placeId || ""
        if (obj.users)
            this.users = obj
                .users
                .map(user => new User(user))
        else
            delete this.users
    }
}