![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)
## Chronos
Microservice communication, health, and Docker container visualizer.

```js
const cmd = require('chronos-microservice-debugger4')
cmd.propagate()

app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))
```

## Features

  * NEW (3.0.0): Docker container stats (e.g. ID, memory usage %, CPU usage %, running processes, etc.) (New middleware compiled from TypeScript.)
  * HTTP request tracing
  * Speed and latency tracking
  * Process monitoring
  * Memory usage

## NEW FEATURE FOR 3.0.0 - Logging Docker Container Stats

In order to have container stats saved to your database along with other health info, when starting up the containers, bind volumes to this path:
`/var/run/docker.sock`

For example, you can type the following when starting up a container:
`docker run -v /var/run/docker.sock:/var/run/docker.sock [your-image-tag]`

If you're using Docker compose to start up multiple containers at once, you can add a `volumes` key for each of your services:
```
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```

*Note: This module leverages the features of [systeminformation](https://systeminformation.io/).

## Installation

Chronos consists of a [Node](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) and a lightweight [Electron](https://electronjs.org/) desktop application.

#### Node module

To begin, install the [Chronos](https://www.npmjs.com/package/chronos-microservice-debugger3) node module within each microservice of your application using the
[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)command:

```
npm install chronos-microservice-debugger4
```

Once installed, write the following two lines at the top of each microservice's server file:
```javascript
const cmd = require('chronos-microservice-debugger4');
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

* v3 Team:
[Alan Lee](https://github.com/ajlee12/), 
[Alon Ofengart](https://github.com/alon25), 
[Brian Bui](https://github.com/Umius-Brian), 
[Brianna Sookhoo](https://github.com/briannasookhoo)

* Previous teams who laid the foundation and put in invaluble work:
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
