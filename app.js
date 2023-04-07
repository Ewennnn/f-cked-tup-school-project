'use strict'

const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Application works !</h1>')
})
app.get('/test', (req, res) => {
  res.send('{message: "successful"}')
})

app.get('/meteo', (req, res) => {
  (async () => {
    const rawResponse = await fetch('https://api.windy.com/api/point-forecast/v2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "lat": 47.218,
        "lon": -1.553,
        "model": "arome",
        "parameters": ["temp"],
        "levels": ["surface"],
        "key": "fmDXiogBRngdqbCVd8NhbZHT7TQ3KvTj"
    })
    });
    const content = await rawResponse.json();
  
    res.send(content);
  })();
})

app.listen(5000, () => {
    console.log("App listening on port 5000!");
})