package com.example.bestdate.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Photos(val photo_reference: String, val html_attribution: MutableList<String>): Parcelable
