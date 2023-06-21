# Chronos Dockerized Microservices Example

This sample microservices architecture allows developers to explore the functionality of Chronos but with one docker compose command. This consists of four microservices, which are contained within the directories:
- Reverse Proxy / Frontend
- Books
- Customers
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.
The frontend has a reverse proxy set up for proxying requests to the appropriate service in the microservice network. Bear in mind that the use of the word 'services' refers to the individual applications in the microservice network. In development they're all run separately on different ports, with said ports listening out for requests. This is for demonstration and testing purposes. Ideally, in a production environment, all the services will be up and running concurrently from the get go and that's what the docker compose file helps us achieve. It is able to chain all the services and run them together with one command. Docker also ensures that the versions that worked well on dev are bundled up and distributed and used to run the containers for the individual containers.

## Steps to Run Example
Peform the following steps in each of the _books_, _customers_, _frontend_, and _orders_ directories

1. Add a `.env` file to *each* folder with the following key/value pairs: 
- **NOTE**: Ensure that there are no quotes surrounding any of the keys and values.

```
CHRONOS_DB = MongoDB or PostgreSQL
CHRONOS_URI = The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos**
BOOK_URI = A **MongoDB** URI for the bookserver microservice to use
CUSTOMER_URI = A **MongoDB** URI for the customerserver microservice to use
ORDER_URI =  A **MongoDB** URI for the orderserver microservice to use
```
2.  Verify that @chronosmicro/tracker is a dependency in each of the /books, /customers, /frontend, and /orders folders (see the `package.json` in each folder).

- If the @chronosmicro/tracker dependency is listed as a remote npm package (i.e. `"@chronosmicro/tracker": "^8.0.3"`) and you've ran *npm install*, no further work is needed continue to step 3. If you have the dependency as `"@chronosmicro/tracker": "file:./chronos_npm_package"`, make sure to change the version from `"file:./chronos_npm_package"` to `"^8.0.3"` and run npm install.

3. With the terminal navigated to the the examples/docker folder, run the command:
```
docker-compose -f docker-compose.yml up
```

# 

You should now see the containers running in your terminal, each reporting "Docker data recorded in...". If this is being displayed for the books, customers, frontend, and orders microservices then the example is successfully saving health metrics to your database of choice!

*If there is any error when running the applications and the underlying files for a microservice were changed, be sure to delete the previous image before calling `docker-compose -f docker-compose.yml up` again. If you do not, the docker compose command will not know to rebuild the image and the code changes meant to fix any issues will not be rolled into the existing Docker image!*

Your microservice health metrics can now be viewed at the given `CHRONOS_URI` or, preferrably, in the Electron.js desktop application.


# To stop and remove containers
Use `docker compose down` to stop containers


## Contributing
Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.
## License
[MIT](LICENSE)