const axios = require('axios').default;

const helpers = {
  /**
   * Helper function to validate input from user's configuration options
   * Throws an error on input valid data types or on missing fields
   * Sets the default interval to 5 seconds and dockerized to false
   */

  /*
  User Config object:
  {
    microservice: string - Name of the microservice. Will be used as a table name in the chronos's db
    interval: number - The number of milliseconds between every collection of data
    dockerized: boolean - Should be set to true if the service is running inside of a container
    NEW! -> jmxuri: string - (optional) The address exposed by the JMX Exporter for collecting Kafka metrics  <- NEW!
    database: {
      connection: should be a string and only supports 'REST' and 'gRPC'
      type: should be a string and only supports 'MongoDB' and 'PostgreSQL'.
      URI: should be a connection string to the database where you intend Chronos to record metrics
    }
    notifications: an array - optional for configuring slack or email notifications
  }

  */
  validateInput: (config) => {
    const out = config;
    const { microservice, database, interval, dockerized, jmxuri, port, mode, promService, promPort} = config;

    // Validate all required fields exist and are valid input types
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

    const modeTypes = ['kafka', 'kubernetes', 'microservices']

    if (!mode || !modeTypes.includes(mode)) {
      throw new Error('You must input a mode into your chronos.config file. The mode may either be "kubernetes", "kafka", or "microservice"')
    }

    // validate that the jmxuri is a string
    if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
      throw new Error(
        'Invalid input for "jmxuri" in chronos-config.js: Please provide the address of the JMX Exporter'
      );
    }

    if (mode === 'kubernetes') {
      if (!promService || typeof promService !== 'string' || !promPort || typeof promPort !== 'number') {
        throw new Error('Invalid input for promService or promPort. promPort must be number and promService must be a string')
      }
    }

    // Validate database type
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
    if (dockerized === undefined || dockerized.constructor.name !== 'Boolean') config.dockerized = false;

    return config;
  },

  /**
   * Sets up notifications depending if the user provides the options
   * Method adds properties to the existing userConfig object with the key
   * being the notification type and the value being the notification settings
   */
  addNotifications: (config) => {
    const { notifications } = config;
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

  getMetricsURI: (config) => {
    if (config.mode === 'kafka') {
      return config.jmxuri;
    } else if (config.mode === 'kubernetes') {
      return `http://${config.promService}:${config.promPort}/api/v1/`;
    } else {
      throw new Error('Unrecognized mode')
    }
  },

  testMetricsQuery: (config) => {
    let URI = helpers.getMetricsURI(config);
    if (config.mode === 'kubernetes') {
      URI += 'query?query=up'
    }
    axios.get(URI)
      .then((response) => {
        if (response.status !== 200) console.error('Invalid response from metrics server:', URI);
        else if (response.status === 200) console.log('Successful initial response from metrics server:', URI);
      })
      .catch((response) => {
        console.error(response);
        throw new Error('Unable to query metrics server: ' + URI)
      })
  },

  kafkaMetricsQuery: (config) => {
    const URI = helpers.getMetricsURI(config);
    // Returns a promise...
    return axios.get(URI)
      .then((response) => helpers.extractWord(config.mode, response.data))
      .catch((err) => console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n',err))
  },

  extractWord: (mode, text) => {
      const res = [];
      const arr = text.split('\n');
      const time = Date.now();
      const category = 'Event';

      for (const element of arr) {
        // Handle comments and edge cases
        if (!element || element[0] === '#') continue;
        if (mode === 'kafka' && (element.substring(0, 3) === 'jmx' || element.substring(0, 4) === "'jmx")) continue;

        const lastSpace  = element.lastIndexOf(' ');
        const metric = element.slice(0, lastSpace);
        const value = Number(element.slice(lastSpace + 1));
        if (!isNaN(value)) {
          res.push({ metric, value, time, category });
        } else {
          console.error('The following metric is invalid and was not saved to the database:\n', element);
        }
      }
      // console.log('Parsed Array length is: ', res.length);
      return res;
  },

  promMetricsQuery: (config) => {
    // query for all of the available metrics
    const URI = helpers.getMetricsURI(config)
    const query =  URI + 'query?query=' + encodeURIComponent('{__name__=~".+",container=""}');
    // Return a promise...
    return axios.get(query)
    .then((response) => helpers.parseProm(response.data.data.result))
    .catch((err) => console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n',err))
  },

  parseProm: (data) => {
    // metric, value, time, category
    const res = [];
    const time = Date.now();
    const category = 'Event';
    const usedCategories = {'job': true, 'instance': true, '__name__': true};

    // Iterate through the metrics to create an object of the expected shape
    for (const info of data) {
        if (!info.metric.job) continue;
        // Set the base name using the job, IP, and metric __name__
        let name = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
        // Tack on the remaining key's values from the remaining metric descriptors
        // This might result in an overly-long metric name though, so commented for now
        // for (let field in info.metric) {
        //     if ((field in usedCategories)) continue
        //     name += '/' + info.metric[field];
        // }
        
        // Save the value in the value key
        let value = info.value;
        if (value.constructor.name === 'Array') value = info.value[1];
        if (isNaN(value) || value === 'NaN') continue;
      
        // Push an object to the output array
        res.push({
            metric: name,
            value: value,
            time: time,
            category: category,
        })
    }

    return res;
  }

};

module.exports = helpers;
