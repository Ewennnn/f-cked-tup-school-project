module.exports = {
  apps : [{
    name   : "ms-meteo",
    script : "./micro-service_meteo/startServer.mjs",
    watch: ["./micro-service_meteo"],
    watch_delay: 1000,
    ignore_watch: ["node_modules"]
}]
}
