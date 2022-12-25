const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000;
app.use(cors());

const chronosConfig = require('./chronos-config.js');
const Chronos = require('chronos-tracker');
const chronos = new Chronos(chronosConfig);


app.post('/chronosMetrics', chronos.kubernetes(),
    (req, res) => res.status(200).send('Modified metrics'))

app.get('/random', (req, res) => res.json({
    number:Math.floor(Math.random() * Math.floor(100))
}));

app.listen(port, () => console.log(`Example app listening on port ${port}! Kubernetes Example Server Loaded`))
