'use strict'
import User from "./user.mjs"

export default class Favorite {
    id 
    date     
    activite 
    ville 

    userId
       
    constructor(obj) {
        // Object.assign(this,obj)
        if(obj.id)
            this.id = obj.id
        this.date = obj.date || Date()
        this.activite = obj.activite || ""
        this.ville = obj.ville || ""
        if(obj.userId){
            this.userId = obj.userId
        }
    }
}