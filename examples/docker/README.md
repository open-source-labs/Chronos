# Chronos Dockerized Microservices Example
This sample microservices architecture allows developers to explore the functionality of Chronos but with one docker compose command. This consists of four microservices, which are contained within the directories:
- Reverse Proxy / Frontend
- Books
- Customers
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.
The frontend has a reverse proxy set up for proxying requests to the appropriate service in the microservice network. Bear in mind that the use of the word 'services' refers to the individual applications in the microservice network. In development they're all run separately on different ports, with said ports listening out for requests. This is for demonstration and testing purposes. Ideally, in a production environment, all the services will be up and running concurrently from the get go and that's what the docker compose file helps us achieve. It is able to chain all the services and run them together with one command. Docker also ensures that the versions that worked well on dev are bundled up and distributed and used to run the containers for the individual containers.

## Steps to Run Example
**Peform the following steps in each of the _/books_, _/customers_, _/frontend_, and _/orders_ directories**

1. Add a `.env` file to each folder with the following key/value pairs:

- `CHRONOS_DB` as either `MongoDB` or `PostgreSQL`

- `CHRONOS_URI` as the URI to the desired MongoDB or PostgreSQL database

2.  Verify that @chronos/tracker is a dependency in each of the /books, /customers, /frontend, and /orders folders (see the `package.json` in each folder).

- If the @chronos/tracker dependency is listed as a remote npm package (i.e. `"@chronos/tracker": "^8.0.1"`), no further work is needed.

- If the @chronos/tracker dependency is listed as a local npm package (i.e. `"@chronos/tracker": "file:./chronos_npm_package"`), the Docker build will require that the the Chronos code is in this folder. Either copy the _chronos_npm_package_ folder in manually, or see note below. If the folder is copied in manually for this example, we recommend deleting the copied in folder from each directory when the example is complete.

- **Mac users only:** `cd` into the _examples/docker/scripts_ folder and run the `buildDockerExample.sh` script. This will automatically copy the _chronos_npm_package_ folder into all 4 folders, and then runs the requried `docker-compose` command. If you run this script this, the example should be up and running and no further steps are needed. To delete the copied in folders if they were not automatically deleted by `buildDockerExample.sh`, run the script `cleanupDockerExample.sh`.

3. With the terminal navigated to the the examples/docker folder, run the command:
```
docker-compose -f docker-compose.yml up
```

You should now see the containers running in your terminal, each reporting "Docker data recorded in...". If this is being displayed for the books, customers, frontend, and orders microservices then the example is successfully saving health metrics to your database of choice!

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People
[Josh James](https://github.com/joshjames289)
[Elise Nie](https://github.com/elisanie)
[Gahl Peled](https://github.com/GP3-RS)
[Troy Prejusa](https://github.com/tprejusa)
[Tim Atapagra](https://github.com/timpagra),
[Mohtasim Chowdhury](https://github.com/mohtasim317),
[Ousman Diallo](https://github.com/Dialloousman),
[Michelle Herrera](https://github.com/mesherrera),
[Duane McFarlane](https://github.com/Duane11003),
[Ben Mizel](https://github.com/ben-mizel),
[Jenae Pennie](https://github.com/jenaepen),
[Chris Romano](https://github.com/robicano22),
[Natalie Umanzor](https://github.com/nmczormick)

## License
[MIT](LICENSE)