'use strict'
import User from "./user.mjs"

export default class Favorite {
    id       
    date     
    activite 
    ville 
       
    constructor(obj) {
        // Object.assign(this,obj)
        this.date = obj.date || Date()
        this.activite = obj.activite || ""
        this.ville = obj.ville || ""
        if (obj.id)
            this.id = obj.id
        else
            this.id = 0
    }
}