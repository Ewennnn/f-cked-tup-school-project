'use strict'
import User from "./user.mjs"

export default class Favorite { 
    placeId 
    users
       
    constructor(obj) {
        this.placeId = obj.placeId || ""
        if (obj.users)
            this.users = obj
                .users
                .map(user => new User(user))
        else
            this.users = []
    }
}