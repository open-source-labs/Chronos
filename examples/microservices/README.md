# Chronos Non-Dockerized Microservices Example

Microservices architecture for testing [Chronos](https://github.com/open-source-labs/Chronos), a microservice communication and health visualizer.

## Purpose and Design
This sample microservices architecture allows developers to explore the functionality of Chronos. It consists of four microservices, which are contained within the directories:
- Reverse Proxy
- Books
- Customers
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.

## Steps to Run Example
1. Create a single .env file in the *examples/microservices* folder with the following key/value pairs:
- `CHRONOS_DB`: `MongoDB` or `PostgreSQL`
- `CHRONOS_URI`: The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos**
- `BOOK_URI`: A **MongoDB** URI for the bookserver microservice to use
- `CUSTOMER_URI`: A **MongoDB** URI for the customerserver microservice to use
- `ORDER_URI`:  A **MongoDB** URI for the orderserver microservice to use


Peform the following steps in each of the *books*, *customers*, *orders*, and *reverse proxy* directories
1. `cd` into the folder
2. Look at `package.json` to note where `@chronosmicro/tracker` is being imported from. Verify that it is coming from the desired location (whether the published remote from npm or from local directory).
3. Run `npm install`
4. Run `npm run start`

#
Then open a web browser to `localhost:3000` and verify that the simple webpage application is operational.

Your microservice health metrics can now be viewed at the given `CHRONOS_URI` or, preferrably, in the Electron.js desktop application.
#

## Contributing
Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People
[Josh James](https://github.com/joshjames289)
[Elise Nie](https://github.com/elisanie)
[Gahl Peled](https://github.com/GP3-RS)
[Troy Prejusa](https://github.com/tprejusa)
[Vince Ho](https://github.com/hodesza)
[Matt Jiang](https://github.com/mattljiang)
[Derek Lam](https://github.com/DerekQuoc)
[Kit Loong Yee](https://github.com/kitloong1)
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