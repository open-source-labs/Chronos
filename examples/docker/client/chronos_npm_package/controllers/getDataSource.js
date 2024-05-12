const axios = require('axios');

async function getGrafanaDatasource() {
    // Fetch datasource information from grafana API.
    // This datasource is PRECONFIGURED on launch using grafana config.
    const datasourceResponse = await axios.get('http://localhost:32000/api/datasources');

    // Create a datasource object to be used within panels.
    const datasource = {
        type: datasourceResponse[0].type,
        uid: datasourceResponse[0].uid,
    };

    return datasource;
}

module.exports = getGrafanaDatasource;