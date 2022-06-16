![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)
## Microservices Architecture
Microservices architecture for testing [Chronos](https://github.com/open-source-labs/Chronos), a microservice communication and health visualizer.

## Purpose and Design - with docker implemented to avoid having to run multiple services in multiple terminals
This sample microservices architecture allows developers to explore the functionality of Chronos but with one docker compose command. This consists of four microservices, which are contained within the directories:
- Reverse Proxy / Frontend
- Books
- Customers
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.
The frontend has a reverse proxy set up for proxying requests to the appropriate service in the microservice network. Bear in mind that the use of the word 'services' refers to the individual applications in the microservice network. In development they're all run separately on different ports, with said ports listening out for requests. This is for demonstration and testing purposes. Ideally, in a production environment, all the services will be up and running concurrently from the get go and that's what the docker compose file helps us achieve. It is able to chain all the services and run them together with one command. Docker also ensures that the versions that worked well on dev are bundled up and distributed and used to run the containers for the individual containers.


Run the containerized microservice application with the following command: Because the docker-compose.yml file is located in the main directory of the application, you'll have to be in the main directory folder location for you to properly access the file and run it. That would be Chronos.

`docker-compose -f docker-compose.yml up`

If that doesn't work and you see an error message similar to this: `failed to build: The command '/bin/sh -c npm install' returned a non-zero code: 1` then the error is most likely from the dependency build. You'll have to manually navigate to each service and rum `npm install` for each service dependency to be installed before the image for the container can be created with docker compose.

Next:

**You must replace the placeholder MongoDB Atlas URIs for the databases with your own _actual_ MongoDB Atlas URIs:** Failure to do so means you won't be able to inspect your database.

```
const myURI = 'mongodb+srv://johndoe:johndoe@cluster0-abcdef.mongodb.net/';
```
Also, see specific files for specific information on further fuctionality

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People

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

[npm-image]: https://img.shields.io/npm/v/chronos-microservice-debugger3.svg
[npm-url]: https://www.npmjs.com/package/chronos-microservice-debugger3
[downloads-image]: https://img.shields.io/npm/dm/chronos-microservice-debugger3.svg
[downloads-url]: https://npmjs.org/package/chronos-microservice-debugger3
