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
        /*this.login = obj.login || ""
        if (obj.password) {
            let crypt = this.cryptPassword(obj.password)
        this.password = crypt.hash
        this.salt = crypt.salt 
        } else {
            this.password = ""
            this.salt = ""
        }*/
        this.password = obj.password
        this.salt = ""
        
        this.email = obj.email || ""
        if (obj.favorites)
            this.favorites = obj
                .favorites
                .map(favorite => new Favorite(favorite))
        else
            this.favorites = []
    }

    async cryptPassword(password){
        const hash = ""
        const salt  = ""
        try {
            salt = await bcrypt.genSalt()
            hash = await bcrypt.hash(password, salt)
            console.log(hash)
        } catch (error) {
            console.log(error.message)
        }
        return {hash, salt}
    }
    
    setPassword(password){
        let crypt = this.cryptPassword(password)
        this.password = crypt.hash
        this.salt = crypt.salt
    }
        
}