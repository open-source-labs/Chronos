const helpers = {
  /**
   * Helper function to validate input from user's configuration options
   * Throws an error on input valid data types or on missing fields
   * Sets the default interval to 5 seconds and dockerized to false
   */
  validateInput(config) {
    let { microservice, database, interval, dockerized } = config;

    // Validate all required fields exist and are valid input types
    if (!microservice || typeof microservice !== 'string') {
      throw new Error('Invalid input "microservice": Please provide a name for your microservice');
    }

    if (!database || typeof database !== 'object' || Array.isArray(database)) {
      throw new Error(
        'Invalid or missing input "database": Must be an object with properties type and URI'
      );
    }

    if (!database.type || typeof database.type !== 'string') {
      throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
    }

    if (!database.URI || typeof database.URI !== 'string') {
      throw new Error('Invalid input "database URI": Please provide the URI to your database');
    }

    // Validate database type
    if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
      throw new Error(
        `Invalid database type "${database.type}". Chronos only supports PostgreSQL and MongoDB.`
      );
    }

    // Default interval to every 10 seconds
    if (!interval || typeof interval !== 'number') config.interval = 10000;

    // Default dockerized to false
    if (dockerized === undefined || typeof dockerized !== 'boolean') config.dockerized = false;
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
          throw new Error(`"${type}" is not a supported notification method for Chronos`);
        } else {
          config[type] = obj.settings;
        }
      });
    }
  },
};

module.exports = helpers;
