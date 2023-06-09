package com.example.bestdate

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.bestdate.data.model.Restaurant
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ListActivity : AppCompatActivity() {
    private lateinit var restaurantsView : RecyclerView
    private var restaurants: List<Restaurant> = listOf()
    private lateinit var adapter : MyAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list)


        // Activer le bouton retour dans l'actionBar
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Résultats de recherche"

        var restauTest = Restaurant("12", "Test", "test", 2.0)
        restaurants = mutableListOf()

        // Research parameters
        val latitude = intent.getDoubleExtra("latitude", 0.0)
        val longitude = intent.getDoubleExtra("longitude", 0.0)
        val radius = intent.getIntExtra("radius", 0)
        this.executeCall(latitude, longitude, radius)

        restaurantsView = findViewById(R.id.restaurantsView)
        restaurantsView.layoutManager = LinearLayoutManager(this)

        adapter = MyAdapter(this, restaurants)
        restaurantsView.adapter = adapter


    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                onBackPressedDispatcher.onBackPressed() // Action du bouton de retour
                return true
            }
            // Ajoutez d'autres actions d'éléments de l'actionBar si nécessaire
        }
        return super.onOptionsItemSelected(item)
    }

    private fun executeCall(latitude : Double, longitude : Double, radius : Int) {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    ApiClient.apiService.getRestaurants(latitude, longitude, radius)
                }
                println(response)
                runOnUiThread {
                    adapter.update(response as MutableList<Restaurant>)
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
                    this@ListActivity,
                    "Error Occurred: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

}