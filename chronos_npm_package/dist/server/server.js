import express from 'express';
import cors from 'cors';
const app = express();
const port = 1111;
import utilities from '../controllers/utilities.js';
import fs from 'fs';
import kuberControllers from './kuberControllers.js';
import fileControllers from './fileControllers.js';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/random', (req, res) => {
    console.log('random endpoint hit');
    console.log('number: ', Math.floor(Math.random() * Math.floor(100)));
    res.json({
        number: Math.floor(Math.random() * Math.floor(100)),
    });
});
app.post('/api/updateDashboard', async (req, res) => {
    const { graphType, metric, token } = req.body;
    console.log(graphType, metric, token);
    console.log('updateDashboard endpoint hit');
    const datasource = await utilities.helpers.updateGrafanaDatasource(token);
    await utilities.helpers.updateGrafanaDashboard(graphType, token, metric, datasource);
    console.log('Dashboard Updated');
    return res.status(200).send('Dashboard Updated');
});
app.get('/api/data', async (req, res) => {
    fs.readFile('./data.csv', 'utf8', (err, data) => {
        if (err) {
            console.log('error: ', err);
            return res.status(500).send('Error');
        }
        console.log('data: ', data);
        return res.status(200).send(data);
    });
});
app.get('/api/kuberData', kuberControllers.getResources, fileControllers.saveCSV, (req, res) => {
    console.log('kuberData endpoint hit');
    fs.readFile('./output.csv', 'utf8', (err, data) => {
        if (err) {
            console.log('error: ', err);
            return res.status(500).send('Error');
        }
        console.log('data: ', data);
        return res.status(200).send(data);
    });
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
app.listen(port, () => console.log(`🤖 Example app listening on port ${port}! chronos_npm_package Server Loaded 🎉`));
//# sourceMappingURL=server.js.map