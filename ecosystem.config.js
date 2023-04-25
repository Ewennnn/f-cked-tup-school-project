module.exports = {
  apps : [{
    name   : "ms-meteo",
    script : "./micro-service_meteo/startServer.mjs",
    watch: ["./micro-service_meteo"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_meteo/node_modules"]
  },
  {
    name: "ms-places",
    script: "./micro-service_places/startServer.mjs",
    watch: ["./micro-service_places"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_places/node_modules"]
  },
  {
    name   : "ms-users",
    script : "./micro-service_users/startServer.mjs",
    watch: ["./micro-service_users"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_users/node_modules"]
  }
]
}
