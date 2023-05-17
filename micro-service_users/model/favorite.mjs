'use strict'
import User from "./user.mjs"

export default class Favorite {
    id 
    date     
    placeId 

    userId
       
    constructor(obj) {
        // Object.assign(this,obj)
        if(obj.id)
            this.id = obj.id
        this.date = obj.date || Date()
        this.placeId = obj.placeId || ""
        if(obj.userId){
            this.userId = obj.userId
        }
    }
}