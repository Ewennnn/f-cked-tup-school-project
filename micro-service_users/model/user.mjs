'use strict'

import Favorite from "./favorite.mjs"


export default class User {
    login
    password
    salt
    email

    favorites
    constructor(obj) {
        // Object.assign(this,obj)
        this.login = obj.login || ""
        this.password = obj.password || ""
        this.salt = obj.salt || ""
        this.email = obj.email || ""
        if (obj.favorites)
            this.favorites = obj
                .favorites
                .map(favorite => new Favorite(favorite))
        else
            this.favorites = []
    }
}