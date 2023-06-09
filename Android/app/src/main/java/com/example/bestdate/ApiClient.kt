package com.example.bestdate

import com.example.bestdate.data.model.ApiService
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {
    private const val BASE_URL: String = "http://51.178.30.150/"

    private val gson : Gson = GsonBuilder().setLenient().create()

    private val httpClient : OkHttpClient = OkHttpClient.Builder().build()

    private val retrofit : Retrofit =
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()

    val apiService : ApiService =
        retrofit.create(ApiService::class)
}