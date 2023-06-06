package com.example.bestdate

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.Toast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ListActivity : AppCompatActivity() {
    private lateinit var btn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list)

        // Activer le bouton retour dans l'actionBar
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Résultats de recherche"

        btn = findViewById(R.id.button)

        btn.setOnClickListener {
            println("TOTO")
            this.executeCall()
        }
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

    private fun executeCall() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    ApiClient.apiService.getRestauants(47.21725, -1.55336, 3000)
                }

                println(response)

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