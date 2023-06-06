package com.example.bestdate.data.model

import retrofit2.http.GET
import retrofit2.http.Path


interface ApiService {
    @GET("api/places/restaurants/{latitude}/{longitude}/{radius}")
    suspend fun getRestauants(
        @Path("latitude") latitude : Double,
        @Path("longitude") longitude : Double,
        @Path("radius") radius : Int,
    ): List<Restaurant>
}