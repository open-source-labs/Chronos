const helpers = {
  /**
   * Helper function to validate input from user's configuration options
   * Throws an error on input valid data types or on missing fields
   * Sets the default interval to 5 seconds and dockerized to false
   */
  validateInput(config) {
    let { microservice, database, interval, dockerized, connection } = config;

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
      throw new Error('Invalid input "database connection type: Please provide the type of conneection');
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
      )
    }

    // Default interval to one minute
    if (!interval || typeof interval !== 'number') config.interval = 60000;

    // Default dockerized to false
    if (dockerized === undefined || dockerized !== 'boolean') config.dockerized = false;
  },

  /**
   * Sets up notifications depending if the user provides the options
   * Method adds properties to the existing userConfig object with the key
   * being the notification type and the value being the notification settings
   */
  addNotifications(config) {
    const { notifications } = config;
    if (notifications) {
      // Current notification methods supported
      const features = ['slack', 'email', 'sms'];

      // Setup notifications for user
      notifications.forEach(obj => {
        const type = obj.type;

        // Throw errors on unsupported notification methods
        if (!features.includes(type)) {
          throw new Error(`${type} is not a supported notification method for Chronos`);
        } else {
          config[type] = obj.settings;
        }
      });
    }
  },
};

module.exports = helpers;
