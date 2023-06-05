"use strict"
import assert from 'node:assert'
import User from './model/user.mjs'
import Favorite from './model/favorite.mjs'
import {userDao} from './dao/userDao.mjs'
import { favorisDao } from './dao/favorisDao.mjs'



await favorisDao.deleteFavoris()
await userDao.deleteUsers()
// let users = await userDao.findAll()
// assert.deepStrictEqual(users,[])
// let user = await userDao.findByLogin("joja")
// assert.equal(user, null)

const favoriteToInsert = new Favorite({
    placeId : "ChIJVzuqS6HuBUgRiH1RPUyBffg"
})

const userToInsert = new User({
    login : "loulou", 
    password : "loulou",
    email : "loulou@gmail.fr"
    // favorite : [favoriteToInsert]

})


let user = await userDao.save(userToInsert)
// user = await userDao.add(userToInsert)
user = await userDao.findByLogin(userToInsert.login)
assert.deepStrictEqual(user, userToInsert)
user = await userDao.findByLogin(userToInsert.login)
assert.deepStrictEqual(user, userToInsert)
assert.rejects(userDao.add(userToInsert))
let users = await userDao.findAll()
assert.deepStrictEqual(users, [userToInsert])
// console.log(users)


// let favorite =  await favoriteDao.add(favoriteToInsert)

user = await userDao.addFavorites(userToInsert, favoriteToInsert)

/** Test : le favoris a bien été rajouté à l'utilisateur */

let favoris = {...favoriteToInsert}
delete favoris.users
// favoris.users = user.favorites[0].users

assert.deepStrictEqual([favoris], user.favorites)

console.log(user);

const userToInsert2 = new User({
    login : "jojo", 
    password : "jojo",
    email : "jojo@gmail.fr"
})

user = await userDao.save(userToInsert2)
// user = await userDao.add(userToInsert)
user = await userDao.findByLogin(userToInsert2.login)
assert.deepStrictEqual(user, userToInsert2)
user = await userDao.findByLogin(userToInsert2.login)
assert.deepStrictEqual(user, userToInsert2)
assert.rejects(userDao.add(userToInsert2))

users = await userDao.findAll()

/** Test : Si il y a bien les 2 utilisateurs */

/** Problème avec le favoris de l'utilisateur 1 */

userToInsert.favorites[0] = users[0].favorites[0]
// userToInsert.favorites[0].userId = users[0].favorites[0].userId

assert.deepStrictEqual(users, [userToInsert, userToInsert2])

user = await userDao.addFavorites(userToInsert2, favoriteToInsert)

/** Test : le favoris a bien été rajouté à l'utilisateur */

let favorisAdd = await favorisDao.findAll()

assert.deepStrictEqual(favorisAdd[0].users[0].login, userToInsert2.login)

/*let favorisAdd = await favorisDao.findAll()

favorisAdd = favorisAdd[0]

delete favorisAdd.users[0].favorites
delete favorisAdd.users[1].favorites

let user1 =  {...userToInsert}
delete user1.favorites
let user2 =  {...userToInsert2}
delete user2.favorites

assert.deepStrictEqual(favorisAdd.users, [user2, user1])*/



favoris = {...favoriteToInsert}
favoris.id = user.favorites[0].id
favoris.userId = user.favorites[0].userId

assert.deepEqual(favoris.placeId, user.favorites[0].placeId)

let listeFavoris = await favorisDao.findAll()

/** Test :  est-ce-qu'il y a bien 1 Favoris dans la BDD */

assert.deepStrictEqual(1, listeFavoris.length)

const favoriteToInsert2 = new Favorite({
    // date : new Date("2020-03-19T14:21:00+0200"),
    placeId : "resto"
})

user = await userDao.addFavorites(userToInsert2, favoriteToInsert2)
user = await userDao.addFavorites(userToInsert, favoriteToInsert2)

listeFavoris = await favorisDao.findAll()

/** Test :  est-ce-qu'il y a bien 2 Favoris dans la BDD au lieu de 1 */

assert.deepStrictEqual(2, listeFavoris.length)