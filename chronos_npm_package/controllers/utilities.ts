// const axios = require('axios').default;
import axios from 'axios';

import { createGrafanaPanelObject, updateGrafanaPanelObject }from './GrafanaPanel';
/**
 * User Config object {
  microservice: string - Name of the microservice. Will be used as a table name in the chronos's db
  interval: number - The number of milliseconds between every collection of data
  dockerized: boolean - Should be set to true if the service is running inside of a container
  jmxuri: string - (optional) The address exposed by the JMX Exporter for collecting Kafka metrics  
  database: {
    connection: should be a string and only supports 'REST' and 'gRPC'
    type: should be a string and only supports 'MongoDB' and 'PostgreSQL'.
    URI: should be a connection string to the database where you intend Chronos to record metrics
  }
  notifications: an array - optional for configuring slack or email notifications
}
*/

/**
 * Helper function to validate input from user's configuration options
 * Throws an error on input valid data types or on missing fields
 * Sets the default interval to 5 seconds and dockerized to false
 */
const helpers = {
  /** Validate all required fields exist and are valid input types */
  validateInput: config => {
    const out = config;
    const {
      microservice,
      database,
      interval,
      dockerized,
      jmxuri,
      port,
      mode,
      promService,
      promPort,
    } = config;

    if (!microservice || typeof microservice !== 'string') {
      throw new Error('Invalid input "microservice": Please provide a name for your microservice');
    }

    if (!database.type || typeof database.type !== 'string') {
      throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
    }

    if (!database.URI || typeof database.URI !== 'string') {
      throw new Error('Invalid input "database URI": Please provide the URI to your database');
    }
    if (!database.connection || typeof database.connection !== 'string') {
      throw new Error(
        'Invalid input "database connection type: Please provide the type of connection'
      );
    }

    const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];

    if (!mode || !modeTypes.includes(mode)) {
      throw new Error(
        'You must input a mode into your chronos.config file. The mode may either be "kubernetes", "kafka", "microservice", or "docker"'
      );
    }

    if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
      throw new Error(
        'Invalid input for "jmxuri" in chronos-config.js: Please provide the address of the JMX Exporter'
      );
    }

    if (mode === 'kubernetes' || mode === 'docker') {
      if (
        !promService ||
        typeof promService !== 'string' ||
        !promPort ||
        typeof promPort !== 'number'
      ) {
        throw new Error(
          'Invalid input for promService or promPort. promPort must be number and promService must be a string'
        );
      }
    }

    if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
      throw new Error(
        `Invalid input "${database.type}". Chronos only supports PostgreSQL and MongoDB.`
      );
    }
    if (database.connection !== 'REST' && database.connection !== 'gRPC') {
      throw new Error(
        `Invalid database connection "${database.connection}". Chronos only supports REST and gRPC.`
      );
    }

    // Default interval to one minute
    if (!interval || typeof interval !== 'number') config.interval = 60000;

    // Default dockerized to false
    if (dockerized === undefined || dockerized.constructor.name !== 'Boolean')
      config.dockerized = false;

    return config;
  },

  /**
   * Sets up notifications depending if the user provides the options
   * Method adds properties to the existing userConfig object with the key
   * being the notification type and the value being the notification settings
   */

  addNotifications: config => {
    const { notifications } = config;
    //POTENTIAL BUG: notifications defaults to an empty array so it should always be truthy. I think code will fire regardless
    if (notifications) {
      // Current notification methods supported
      const features = ['slack', 'email', 'sms'];

      // Setup notifications for user
      notifications.forEach(obj => {
        const { type } = obj;

        // Throw errors on unsupported notification methods
        if (!features.includes(type)) {
          throw new Error(`${type} is not a supported notification method for Chronos`);
        } else {
          config[type] = obj.settings;
        }
      });
    }
    return config;
  },

  /**
   * Determines URI if the user is running kafka or kubernetes
   * @param {*} config
   * @returns URI for exposed port
   */

  getMetricsURI: config => {
    if (config.mode === 'kafka') {
      return config.jmxuri;
    } else if (config.mode === 'kubernetes' || config.mode === 'docker') {
      return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
    } else {
      throw new Error('Unrecognized mode');
    }
  },

  /**
   * Confirms URI provided is queryable
   * @param {*} config
   * @returns undefined
   */
  testMetricsQuery: async config => {
    let URI = helpers.getMetricsURI(config);
    URI += 'up';
    try {
      const response = await axios.get(URI);
      if (response.status !== 200) console.error('Invalid response from metrics server:', URI, response.status, response.data);
      else console.log('Successful initial response from metrics server:', URI);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to query metrics server: ' + URI);
    }
  },

  /**
   * Queries the kafka URI and parses response data
   * @param {*} config
   * @returns parsed response data
   */

  kafkaMetricsQuery: async config => {
    const URI = helpers.getMetricsURI(config);
    try {
      const response = await axios.get(URI);
      return helpers.extractWord(config.mode, response.data);
    } catch (error) {
      return console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
    }
  },

  /**
   * Confirms that configuration mode is kafka and parses through data in response to an axios.get request
   * @param {*} mode string
   * @param {*} text object
   * @returns object with the gathered metric, value, time gathered, and category of event
   */

  extractWord: (mode, text) => {
    const res = [];
    const arr = text.split('\n');
    const time = Date.now();
    const category = 'Event';

    for (const element of arr) {
      // Handle comments and edge cases
      if (!element || element[0] === '#') continue;
      if (
        mode === 'kafka' &&
        (element.substring(0, 3) === 'jmx' || element.substring(0, 4) === "'jmx")
      )
        continue;

      const lastSpace = element.lastIndexOf(' ');
      const metric = element.slice(0, lastSpace);
      const value = Number(element.slice(lastSpace + 1));
      if (!isNaN(value)) {
        res.push({ metric, value, time, category });
      } else {
        console.error(
          'The following metric is invalid and was not saved to the database:\n',
          element
        );
      }
    }
    // console.log('Parsed Array length is: ', res.length);
    return res;
  },

  /**
   * Querys all available prometheus metrics and returns a parsed response
   * @param {*} config
   * @returns
   */
  promMetricsQuery: async config => {
    const URI = helpers.getMetricsURI(config);
    let query;
    if (config.mode === 'docker') {
      query = URI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`);
    } else {
      query = URI + encodeURIComponent('{__name__=~".+",container=""}');
    }
    try {
      const response = await axios.get(query);
      //console.log('promMetricsQuery line 236:', response.data.data.result);
      return helpers.parseProm(config, response.data.data.result);
    } catch (error) {
      return console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
    }
  },

  /**
   * Parses response from Prometheus request and returns object with
   * @param {*} data
   * @returns bject with the gathered metric, value, time gathered, and category of event
   */
  parseProm: (config, data) => {
    const res = [];
    const time = Date.now();
    const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';

    /**
     * Opportunity for improvement: Prometheus may query metrics that have the same job + instance + metric
     * which means they end up having the same name (see name variable).
     * When this happens, it means that the parsedArray returned from this function
     * will  have a different length than the metricNames length.
     * To avoid this, Chronos currently only saves the first occurence of any particular ${name}.
     * This can be improved in the future by distinguishing between each ${name},
     * but be aware that if the ${name} is too long, it will be rejected by the database.
     */

    const names = new Set();

    for (const info of data) {
      let wholeName;
      let name;
      if (config.mode === 'docker') {
        if (!info.metric.name) continue;
        wholeName = info.metric['__name__'];
        name = wholeName.replace(/.*\/.*\//g, '');
      } else {
        if (!info.metric.job) continue;
        // Set the base name using the job, IP, and metric __name__
        wholeName = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
        name = wholeName.replace(/.*\/.*\//g, '');
      }
      if (names.has(name)) continue;
      else {
        names.add(name);
        // Tack on the remaining key's values from the remaining metric descriptors
        // This might result in an overly-long metric name though, so commented for now
        // for (let field in info.metric) {
        //     if ((field in usedCategories)) continue
        //     name += '/' + info.metric[field];
        // }

        let value = info.value;
        if (value.constructor.name === 'Array') value = info.value[1];
        if (isNaN(value) || value === 'NaN') continue;

        res.push({
          metric: wholeName,
          value: value,
          time: time,
          category: category,
        })
      }
    }
    console.log('is size equal?', res.length === new Set(res).size);
    //console.log("!res is: ", res);
    return res;
  },



  createGrafanaDashboard: async (
    metric,
    datasource,
    graphType,
    token
  ) => {
    let uid = metric.metric.replace(/.*\/.*\//g, '')
    if (metric.metric.replace(/.*\/.*\//g, '').length >= 40) {
      uid = metric.metric.slice(metric.metric.length - 39);
    }
    //console.log("uid is: ", uid)
    //console.log("metric is: ", metric)
    // create dashboard object boilerplate
    const dashboard = {
      "dashboard": {
        "id": null,
        "uid": uid,
        "title": metric.metric.replace(/.*\/.*\//g, ''),
        "tags": ["templated"],
        "timezone": "browser",
        "schemaVersion": 16,
        "version": 0,
        "refresh": "10s",
        panels: [],
      },
      folderId: 0,
      overwrite: true,
    };


    // push panel into dashboard object with a line for each metric in promQLQueries object
    dashboard.dashboard.panels.push(createGrafanaPanelObject(metric, datasource, graphType));
    try {
      // POST request to Grafana Dashboard API to create a dashboard
      const dashboardResponse = await axios.post(
        'http://grafana:3000/api/dashboards/db',
        JSON.stringify(dashboard),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        }
      );

      // Descriptive error log for developers
      if (dashboardResponse.status >= 400) {
        console.log(
          'Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.'
        );
      } else {
        // A simple console log to show when graphs are done being posted to Grafana.
        console.log(`📊 Grafana graphs for the ${metric.metric.replace(/.*\/.*\//g, '')} metric are ready 📊 `);
      }
    } catch (err) {
      console.log(err);
    }
  },

  getGrafanaDatasource: async (token) => {
    // Fetch datasource information from grafana API.
    // This datasource is PRECONFIGURED on launch using grafana config.
    console.log('In utilities.getGrafanaDatasource!!!');
    const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });
    // console.log('utilities.getGrafanaDatasource line 379:', datasourceResponse);
    console.log("Successfully fetched datasource from Grafana API")
    // Create a datasource object to be used within panels.
    const datasource = {
      type: datasourceResponse.data[0].type,
      uid: datasourceResponse.data[0].uid,
    };
    // console.log('datasource is', datasource)

    return datasource;
  },

  updateGrafanaDatasource: async (token) => {
    // Fetch datasource information from grafana API.
    // This datasource is PRECONFIGURED on launch using grafana config.
    const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });
    console.log("Successfully fetched datasource from Grafana API")
    // Create a datasource object to be used within panels.
    const datasource = {
      type: datasourceResponse.data[0].type,
      uid: datasourceResponse.data[0].uid,
    };
    console.log('datasource is', datasource)

    return datasource;
  },

  updateGrafanaDashboard: async (graphType, token, metric, datasource) => {
    let uid = metric.replace(/.*\/.*\//g, '')
    if (metric.replace(/.*\/.*\//g, '').length >= 40) {
      uid = metric.slice(metric.length - 39);
    }
    //console.log("uid is: ", uid)
    //console.log("metric is: ", metric)
    // create dashboard object boilerplate
    const dashboard = {
      "dashboard": {
        "id": null,
        "uid": uid,
        "title": metric.replace(/.*\/.*\//g, ''),
        "tags": ["templated"],
        "timezone": "browser",
        "schemaVersion": 16,
        "version": 0,
        "refresh": "10s",
        panels: [],
      },
      folderId: 0,
      overwrite: true,
    };


    // push panel into dashboard object with a line for each metric in promQLQueries object
    dashboard.dashboard.panels.push(updateGrafanaPanelObject(metric, datasource, graphType));

    try {
      // POST request to Grafana Dashboard API to create a dashboard
      const dashboardResponse = await axios.post(
        'http://localhost:32000/api/dashboards/db',
        JSON.stringify(dashboard),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        }
      );
      //console.log("dashboardResponse is: ", dashboardResponse)

      // Descriptive error log for developers
      if (dashboardResponse.status >= 400) {
        console.log(
          'Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.'
        );
      } else {
        // A simple console log to show when graphs are done being posted to Grafana.
        console.log(`📊 Grafana graphs 📊 for the ${metric.replace(/.*\/.*\//g, '')} has been updated!!!`);
      }
    } catch (err) {
      console.log(err);
    }

  }
};

// module.exports = helpers;

export default {helpers};
