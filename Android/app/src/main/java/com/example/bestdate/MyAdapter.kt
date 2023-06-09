package com.example.bestdate

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.bestdate.data.model.Restaurant

class MyAdapter(private val context : Context, private var dataList: List<Restaurant>) : RecyclerView.Adapter<MyAdapter.RestaurantViewHolder>() {


    class RestaurantViewHolder(val view : View) : RecyclerView.ViewHolder(view) {
        val name = view.findViewById<TextView>(R.id.rest_name)
        val rating = view.findViewById<RatingBar>(R.id.rest_rate)
    }

    fun update(newData : MutableList<Restaurant>) {
        dataList = newData
        notifyDataSetChanged()
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RestaurantViewHolder {
        val layout = LayoutInflater.from(context).inflate(R.layout.list_item, parent, false)
        return RestaurantViewHolder(layout)
    }

    override fun onBindViewHolder(holder: RestaurantViewHolder, position: Int) {
        val data = dataList[position]
        if (data.name.length > 25) {
            var temp = data.name.substring(0, 25) + " ..."
            holder.name.text = temp
        } else  {
            holder.name.text = data.name
        }

        holder.name.setOnClickListener {
            context.startActivity(Intent(context, DetailActivity::class.java).putExtra(DetailActivity.CLE, data.place_id))
        }
        holder.rating.rating = data.rating.toFloat()
    }

    override fun getItemCount(): Int {
        return dataList.size
    }

    }

