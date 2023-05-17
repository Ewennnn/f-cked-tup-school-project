module.exports = {
  apps : [{
    name   : "ms-meteo",
    script : "./micro-service_meteo/startServer.mjs",
    watch: ["./micro-service_meteo"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_meteo/node_modules", ".git"]
  },
  {
    name: "ms-places",
    script: "./micro-service_places/startServer.mjs",
    watch: ["./micro-service_places"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_places/node_modules", ".git"]
  },
  {
    name   : "ms-users",
    script : "./micro-service_users/startServer.mjs",
    watch: ["./micro-service_users"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_users/node_modules", ".git", "./micro-service_users/prisma/data"]
  },
  {
    name: "ms-location",
    script: "./micro-service_location/startServer.mjs",
    watch: ["./micro-service_location"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./micro-service_location/node_modules", ".git"]
  },
  {
    name: "WEB",
    script: "./website/SAE/run.sh",
    watch: ["./website/SAE/index.html", "./website/SAE/src", "./website/SAE/public"],
    watch_delay: 1000,
    ignore_watch: ["node_modules", "./website/SAE/node_modules", ".git"]
  }
]
}
