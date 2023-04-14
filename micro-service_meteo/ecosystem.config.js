module.exports = {
  apps : [{
    name   : "ms-meteo",
    script : "./startServer.mjs",
    watch: ["/home/debian/eq_alt_00_barassin-lenny_beneteau-victor_bosquet-ewen_boulay-jonathan/micro-service_meteo"],
    watch_delay: 1000,
    ignore_watch: ["node_modules"]
}]
}
