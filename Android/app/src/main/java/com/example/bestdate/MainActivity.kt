package com.example.bestdate

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.*
import androidx.appcompat.view.ActionMode
import kotlinx.coroutines.Dispatchers
import java.util.Calendar

class MainActivity : AppCompatActivity() {
    private lateinit var selectCity: Spinner
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
            startActivity(intent)
        }
    }
}