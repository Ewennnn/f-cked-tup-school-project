package com.example.bestdate

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.bestdate.data.model.Restaurant
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class DetailActivity : AppCompatActivity() {
    companion object {
        val CLE = "cle"
    }
    lateinit var restau_Details : Restaurant
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        intent.getStringExtra(CLE)?.let { executeCall(it) }

    }

    private fun executeCall(place_id : String) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    ApiClient.apiService.getRestaurant(place_id)
                }
                restau_Details = response
                println(restau_Details)
                runOnUiThread {
                    //TODO
                }




                //if (response.isSuccessful && response.body() != null) {
                //    val content = response.body()
                //    // Faire quelque chose avec les données
                //} else {
                //    Toast.makeText(
                //        this@ListActivity,
                //        "Error Occurred: ${response.message()}",
                //        Toast.LENGTH_LONG
                //    ).show()
                //}

            } catch (e: Exception) {
                println(e)
                Toast.makeText(
                    this@DetailActivity,
                    "Error Occurred: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }
}