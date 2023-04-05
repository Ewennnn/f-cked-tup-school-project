module.exports = {
  apps : [{
    name   : "sae4",
    script : "./app.js",
    watch: ["/home/debian/eq_alt_00_barassin-lenny_beneteau-victor_bosquet-ewen_boulay-jonathan"],
    watch_delay: 1000,
    ignore_watch: ["node_modules"]
  }]
}
