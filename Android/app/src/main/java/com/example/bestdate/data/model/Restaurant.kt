package com.example.bestdate.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


@Parcelize
data class Restaurant(val place_id: String, val name: String, val vicinity: String, val rating: Double, var international_phone_number : String = "+33000000000", val photos : Photos? = null):
    Parcelable
