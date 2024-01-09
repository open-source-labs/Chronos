const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const chronosConfig = {
  // General configuration
  microservice: 'auth',
  interval: 5000,

  // Mode Specific
  mode: 'docker',
  promService: 'docker.for.mac.localhost',
  promPort: 9090,
  containerName: 'auth',

  database: {
    connection: 'REST',
    type: process.env.CHRONOS_DB,
    URI: process.env.CHRONOS_URI,
  },
  grafanaAPIKey: process.env.CHRONOS_GRAFANA_API_KEY,
  notifications: [],
};
export default chronosConfig;
``