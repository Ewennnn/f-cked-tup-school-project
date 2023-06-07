package com.example.bestdate

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.CalendarView
import android.widget.Spinner
import android.widget.Switch
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var selectCity: Spinner
    @SuppressLint("UseSwitchCompatOrMaterialCode")
    private lateinit var useMyLoc: Switch
    private lateinit var calendar: CalendarView
    private lateinit var searchBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Cacher l'actionBar
        supportActionBar?.hide()

        selectCity = findViewById(R.id.selectCity)
        useMyLoc = findViewById(R.id.useMyLoc)
        calendar = findViewById(R.id.calendar)
        searchBtn = findViewById(R.id.searchBtn)

        searchBtn.setOnClickListener {
            // Code exécuté lors du clic sur le bouton
            val intent = Intent(this, ListActivity::class.java)
            intent.putExtra("latitude", 47.21725)
            intent.putExtra("longitude", -1.55336)
            intent.putExtra("radius", 3000)
            startActivity(intent)
        }
    }
}