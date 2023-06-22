# Chronos Non-Dockerized Microservices Example

Microservices architecture for testing [Chronos](https://github.com/open-source-labs/Chronos), a microservice communication and health visualizer.

## Purpose and Design
This sample microservices architecture allows developers to explore the functionality of Chronos. It consists of four microservices, which are contained within the directories:
- books
- customers
- orders
- reverse_proxy

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.
## Additional Documentation

For additional information on how Chronos works this example, please review the microservices section in the [Chronos NPM Package README](../../chronos_npm_package/README.md).

## To Set Up Database for Storing/Retrieving Metrics
Create a single .env file in the *examples/microservices* folder with the following key/value pairs:
- `CHRONOS_DB`: `MongoDB` or `PostgreSQL`
- `CHRONOS_URI`: The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos NPM Package**
- `BOOK_URI`: A **MongoDB** URI for the `books` microservice to use
- `CUSTOMER_URI`: A **MongoDB** URI for the `customers` microservice to use
- `ORDER_URI`:  A **MongoDB** URI for the `orders` microservice to use

Note: The `CHRONOS_URI` and all microservice `_URI`'s can be the same URI if you use MongoDB. You may run out of space in your database if the services run for an extended period of time. You can temporarily solve this by creating separate databases, or manually deleting the collection from the database regularly using a UI such as MongoDB Compass. When running, the microservices will create new collections if none are found in the database.

## Start the Microservices
Peform the following steps in each of the *books*, *customers*, *orders*, and *reverse_proxy* directories
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