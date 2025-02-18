import axios from 'axios'; // Imports Axios for making HTTP requests

async function getGrafanaDatasource() {
    // Make an HTTP request to get the list of datasources from Grafana.
    // Grafana uses datasources like Prometheus, InfluxDB, etc., to store and retrieve monitoring metrics.
    const datasourceResponse = await axios.get('http://localhost:32000/api/datasources');

    //  Access the first datasource from the response.
    // Grafana API returns an array of datasources, so we are assuming the first one is the one we need.
    const datasource = {
        type: datasourceResponse[0].type, // This is the type of datasource (i.e., Prometheus)
        uid: datasourceResponse[0].uid,   // Unique identifier for this datasource
    };

    return datasource; //  Return the accessed datasource info.
}

module.exports = getGrafanaDatasource; 
