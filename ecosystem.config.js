module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
    watch: ["server"],
    watch_delay: 1000,
    ignore_watch: ["node_modules"]
  }]
}
