const helpers = {
  validateInput(config) {
    let { name, database, interval, dockerized } = config;

    // Validate all required fields exist and are valid input types
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid input "name": Please provide a name for your microservice');
    }

    if (!database.type || typeof database.type !== 'string') {
      throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
    }

    if (!database.URI || typeof database.URI !== 'string') {
      throw new Error('Invalid input "database URI": Please provide the URI to your database');
    }

    // Validate database type
    console.log('our database', database.type);
    if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
      throw new Error(
        `Invalid input "${database.type}". Chronos only supports PostgreSQL and MongoDB.`
      );
    }

    // Default interval to one minute
    if (!interval || typeof interval !== 'number') config.interval = 60000;

    // Default dockerized to false
    if (dockerized === undefined || dockerized !== 'boolean') config.dockerized = false;
  },

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
