# Example Microservices Application (Non-Containerized)

## Purpose

An example microservices application for testing the [Chronos App](https://github.com/open-source-labs/Chronos). The [Chronos NPM package](https://www.npmjs.com/package/@chronosmicro/tracker) is installed and configured in each service to track metrics on communcation between services such as request and response cycles. Below are instructions for demo-ing Chronos with this example application.

## Design

The microservices application consists of six microservices, which are located within the following directories:

- client
- auth
- items
- inventory
- orders
- event-bus

The client serves a build version of the React application found in client-dev.

The application functionality includes:

- login/logout with a predefined test user
- creating items
- adjustment of item inventories
- creating orders
- throwing a 404 error - sending request to non-existent route

The Chronos NPM package is configured to track these request / response cycles.

The Event Bus serves as the intermediary between the backend services, facilitating communication by emitting and receiving numerous types of events and relaying them from one service to another. [review]

The Event Bus facilitates communication between the backend services. [review]

Additionally, there is a common folder and a client-dev folder. In common, there can be found both a src and build folder. src contains (in Typescript) files common to each of the microservices. The related folder, build, will contain, after having run the scripts detailed in the package.json file, the resultant compiled Javascript files to be used by the corresponding services.

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.

## Additional Documentation

For additional information on how Chronos works this example, please review the microservices section in the [Chronos NPM Package README](../../chronos_npm_package/README.md).

## To Set Up Database for Storing/Retrieving Metrics

Create a single .env file in the _examples/microservices_ folder with the following key/value pairs:

- `CHRONOS_DB`: `MongoDB` or `PostgreSQL`
- `CHRONOS_URI`: The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos NPM Package**
- `MONGO_URI_AUTH`: A **MongoDB** URI for the `auth` microservice to use
- `MONGO_URI_ITEMS`: A **MongoDB** URI for the `items` microservice to use
- `MONGO_URI_INVENTORY`: A **MongoDB** URI for the `inventory` microservice to use
- `MONGO_URI_ORDERS`: A **MongoDB** URI for the `orders` microservice to use
- `MONGO_URI_CLIENT`: A **MongoDB** URI for the `client` microservice to use
- `JWT_KEY`: A random string used to sign and and verify JSON Web Tokens used by the auth service - the random string provided in **sample.env** will work
- `JWT_LIFETIME`: The time-to-expiration of the JSON Web Token used by the auth service - this is set to **"1d"** in **sample.env** meaning user authentication is valid for 1 day

Note: The `CHRONOS_URI` and all microservice `_URI`'s can be the same URI if you use MongoDB. You may run out of space in your database if the services run for an extended period of time. You can temporarily solve this by creating separate databases, or manually deleting the collection from the database regularly using a UI such as MongoDB Compass. When running, the microservices will create new collections if none are found in the database.

## Start the Microservices

Peform the following steps in each of the _books_, _customers_, _orders_, and _reverse_proxy_ directories

1. `cd` into the folder
2. Look at `package.json` to note where `@chronosmicro/tracker` is being imported from. Verify that it is coming from the desired location (whether the published remote from npm or from local directory).
3. Run `npm install`
4. Run `npm run start`

**Mac Users:** Alternative to the above list of steps, `cd` into the `scripts` folder and run the `startMicroservices.sh` script

#

Then open a web browser to `localhost:3000` and verify that the simple webpage application is operational. You can use the web app if you wish, but it is not necessary for retrieving and visualizing health metrics in Chronos.

Your microservice health metrics can now be viewed in the given `CHRONOS_URI` database, or, preferrably, in the Electron.js desktop application.

#

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

Read our [contributing README](../../CONTRIBUTING.md) to further learn how you can take part in improving Chronos.

## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)
