"use strict"
import assert from 'node:assert'
import User from './model/user.mjs'
import Favorite from './model/favorite.mjs'
import {userDao} from './dao/userDao.mjs'
import { favoriteDao } from './dao/favoriteDao.mjs'



await userDao.deleteUsers()
await favoriteDao.deleteFavorite()
let users = await userDao.findAll()
assert.deepStrictEqual(users,[])
let user = await userDao.findByLogin("jojo")
assert.equal(user, null)

const favoriteToInsert = new Favorite({
    date : new Date("2020-03-19T14:21:00+0200"),
    activite : "restaurant",
    ville : "Nantes"
})

const userToInsert = new User({
    login : "jojo", 
    password : "jojo",
    salt : "mdr",
    email : "jojo@gmail.fr"
    // favorite : [favoriteToInsert]

})


user = await userDao.save(userToInsert)
// user = await userDao.add(userToInsert)
assert.deepStrictEqual(user, userToInsert)
user = await userDao.findByLogin("jojo")
assert.deepStrictEqual(user, userToInsert)
assert.rejects(userDao.add(userToInsert))
users = await userDao.findAll()
assert.deepStrictEqual(users, [userToInsert])
console.log(users)


// favorite =  await favoriteDao.add(favoriteToInsert)

user = await userDao.addFavorites(userToInsert, favoriteToInsert)