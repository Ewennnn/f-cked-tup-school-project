'use strict'

import Favorite from "./Favorite.mjs"

export default class User {
    login
    password
    email

    favorites
    constructor(obj) {
        // Object.assign(this,obj)
        this.login = obj.login || ""
        this.password = obj.password || ""
        this.email = obj.email || ""
        if (obj.favorites)
            this.favorites = obj
                .favorites
                .map(favorite => new Favorite(favorite))
        else
            this.favorites = []
    }       
}