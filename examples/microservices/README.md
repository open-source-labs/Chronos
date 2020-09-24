![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)
## Microservices Architecture
Microservices architecture for testing [Chronos](https://github.com/oslabs-beta/Chronos), a microservice communication and health visualizer.

## Purpose and Design
This sample microservices architecture allows developers to explore the functionality of Chronos. It consists of four microservices, which are contained within the directories:
- Reverse Proxy
- Books
- Customers
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.

**You must replace the placeholder MongoDB Atlas URIs for the databases with your own _actual_ MongoDB Atlas URIs:**

```
const myURI = 'mongodb+srv://johndoe:johndoe@cluster0-abcdef.mongodb.net/';
```

In order to start the entire application, you will need to start each microservice's server. To do so, within each microservice directory, install all dependencies using the `npm install` command followed by the `npm start` command. You will then be able to interact with the application (as though you are a user) on a barebones frontend, which is being served by the Reverse Proxy server and can be found at localhost:3000.

**To test the functionality of Chronos using this sample microservices architecture, you must install the [Chronos node module](https://www.npmjs.com/package/chronos-microservice-debugger3) within each microservice. _It is not pre-installed._ Installation instructions for both the Chronos node module and the Chronos desktop visualizer are below:**

## Installation

Chronos consists of a [Node](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) and a lightweight [Electron](https://electronjs.org/) desktop application.

#### Node module

To install the [Chronos](https://www.npmjs.com/package/chronos-microservice-debugger3) node module within each microservice, use the
[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)command:

```
npm install chronos-microservice-debugger3
```

Once installed, write the following two lines at the top of each microservice's server file:
```javascript
const cmd = require('chronos-microservice-debugger3');
cmd.propagate();
```

Then add a route handler for all incoming requests:
```js
app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))
```

The cmd.microCom handler function logs communication and health data to a user-provided database. This is to ensure that your private data stays private. We currently support MongoDB and SQL/PostgreSQL databases.

cmd.microCom takes four parameters and an optional fifth parameter. You can enter the arguments as individual strings or as an array.

The parameters are:
1. microserviceName: To identify the microservice (i.e. "payments")
2. databaseType: Enter either "mongo" or "sql"
3. databaseURL: Enter the URL of your database
4. wantMicroHealth: Do you want to monitor the health of this microservice? Enter "yes" or "no"
5. queryFrequency (optional): How frequently do you want to log the health of this microservice? It defaults to every minute, but you can choose:
  * "s" : every second
  * "m" : every minute (default)
  * "h" : every hour
  * "d" : once per day
  * "w" : once per week

String parameter example:
```javascript
app.use('/', cmd.microCom('payments', 'mongo', 'mongodb+srv://user:password@cluster0-abc.mongodb.net/','yes','h'))
```

Array parameter example:
```javascript
let values = [
  'payments',
  'mongo',
  'mongodb+srv://user:password@cluster0-abc.mongodb.net/',
  'yes',
  'h'
]

app.use('/', cmd.microCom(values)
```

#### Electron desktop application

After installing the node module in each microservice, download the Electron desktop application from the public [Chronos](https://github.com/oslabs-beta/Chronos) repo.

Inside the downloaded directory, install all dependencies using the `npm install` command followed by the `npm start` command to start the Electron desktop application.

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
