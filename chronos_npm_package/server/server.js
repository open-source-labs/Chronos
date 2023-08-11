const express = require('express');
const cors = require('cors');
const app = express()
const port = 1111;
const utilities = require('../controllers/utilities');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.get('/random', (req, res) => {
    console.log('random endpoint hit')
    res.json({
        number: Math.floor(Math.random() * Math.floor(100))
    })
}
);

app.get('api/updateDashboard', async (req, res) => {
    const { graphType } = req.body;
    console.log('updateDashboard endpoint hit');
    const datasource = await utilities.getGrafanaDatasource();
    await utilities.updateGrafanaDashboard(graphType, token, metric, datasource);
    return res.status(200).send('Dashboard Updated');
});





app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}! chronos_npm_package Server Loaded`))
