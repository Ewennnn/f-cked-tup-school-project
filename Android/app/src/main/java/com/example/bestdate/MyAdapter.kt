package com.example.bestdate

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.bestdate.data.model.Restaurant

class MyAdapter(private val dataList: List<Restaurant>) : RecyclerView.Adapter<MyAdapter.RestaurantViewHolder>() {

    class RestaurantViewHolder(val view : View) : RecyclerView.ViewHolder(view) {
        val name = view.findViewById<TextView>(R.id.rest_name)
        val vicinity = view.findViewById<TextView>(R.id.vicinity)
        val rating = view.findViewById<TextView>(R.id.rest_rate)
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RestaurantViewHolder {
        val layout = LayoutInflater.from(parent.context).inflate(R.layout.layout_list, parent, false)
        return RestaurantViewHolder(layout)
    }

    override fun onBindViewHolder(holder: RestaurantViewHolder, position: Int) {
        val data = dataList[position]
        holder.name.text = data.name
        holder.vicinity.text = data.vicinity
        holder.rating.text = data.rating.toString()
    }

    override fun getItemCount(): Int {
        return dataList.size
    }

    }

