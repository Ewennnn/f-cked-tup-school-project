'use strict'

import Favorite from "./favorite.mjs"
import bcrypt from 'bcryptjs'

export default class User {
    login
    password
    email

    favorites
    constructor(obj) {
        // Object.assign(this,obj)
        this.login = obj.login || ""
        if (obj.password) {
            if (!obj.salt){
                let crypt = this.cryptPassword(obj.password)
                this.password = crypt.hash
                this.salt = crypt.salt 
            } else {
                this.password = obj.password
                this.salt = obj.salt
            }
            
        
        } else {
            this.password = ""
            this.salt = ""
        }
        
        this.email = obj.email || ""
        if (obj.favorites)
            this.favorites = obj
                .favorites
                .map(favorite => new Favorite(favorite))
        else
            this.favorites = []
        
        
    }

    cryptPassword(password){
        let hash = ""
        let salt  = ""
        salt = bcrypt.genSaltSync()
        hash = bcrypt.hashSync(password, salt)

        return {hash: hash, salt:salt}
    }
    
    setPassword(password){
        let crypt = this.cryptPassword(password)
        this.password = crypt.hash
        this.salt = crypt.salt
    }
        
}