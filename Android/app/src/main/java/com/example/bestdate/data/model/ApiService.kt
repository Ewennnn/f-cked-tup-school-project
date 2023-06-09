package com.example.bestdate.data.model

import retrofit2.http.GET
import retrofit2.http.Path


interface ApiService {
    @GET("api/places/restaurants/{latitude}/{longitude}/{radius}")
    suspend fun getRestaurants(
        @Path("latitude") latitude : Double,
        @Path("longitude") longitude : Double,
        @Path("radius") radius : Int,
    ): List<Restaurant>

    @GET("api/places/restaurants/{place_id}")
    suspend fun getRestaurant(
        @Path("place_id") place_id : String
    ) : Restaurant
}