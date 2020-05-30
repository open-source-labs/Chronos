![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)
## Chronos
Microservice communication, health, and Docker container visualizer.
Comes with a middleware and an Electron app.

## Features

  * NEW (3.0+): Docker container stats (e.g. ID, memory usage %, CPU usage %, running processes, etc.) (New middleware compiled from TypeScript.)
  * HTTP request tracing
  * Speed and latency tracking
  * Process monitoring
  * Memory usage

## NEW FEATURE FOR 3.0+ - Logging Docker Container Stats

IMPORTANT: Give your containers the same names you use for arguments for microservice names. Read more about it under the INSTALLATION section below.

IMPORTANT: In order to have container stats saved to your database along with other health info, when starting up the containers, bind volumes to this path:
`/var/run/docker.sock`

For example, you can type the following when starting up a container:
`docker run -v /var/run/docker.sock:/var/run/docker.sock [your-image-tag]`

If you're using docker-compose to start up multiple containers at once, you can add a `volumes` key for each of your services in the YAML file:
```
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```

*Note: This module leverages the features of [systeminformation](https://systeminformation.io/).

## Installation

Chronos consists of a [Node](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) and a lightweight [Electron](https://electronjs.org/) desktop application.

#### Node module

To begin, install the [Chronos](https://www.npmjs.com/package/chronos-microservice-debugger4) node module within each microservice of your application using the
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
app.use('/', 
  cmd.microCom(
    'microserviceName', 
    'databaseType',
    'databaseURL',
    'wantMicroHealth', 
    'queryFrequency',
    'isDockerized'
  )
)
```

The cmd.microCom handler function logs communication and health data to a user-provided database. This is to ensure that your private data stays private. We currently support MongoDB and SQL/PostgreSQL databases.

cmd.microCom takes six parameters. You can enter the arguments as individual strings or as an array.

The parameters are:
* [1] microserviceName: To identify the microservice (i.e. "payments").
  - Make sure this name matches your container name. More details more below (param #6).
  - Your input name for the microservice will be turned to an all-lowercase string.
* [2] databaseType: Enter either "mongo" or "sql".
* [3] databaseURL: Enter the URL of your database.
* [4] wantMicroHealth: Do you want to monitor the health of this microservice? Enter "yes" or "no".
  - Note: If you choose "yes" for this param, the middleware will NOT log container stats. In other words, if you want container stats instead, input "no" here and "yes" for param #6.
* [5] queryFrequency (optional): How frequently do you want to log the health of this microservice? It defaults to every minute, but you can choose:
  - "s" : every second
  - "m" : every minute (default)
  - "h" : every hour
  - "d" : once per day
  - "w" : once per week
* [6] isDockerized: Is this microservice running in a Docker container? Enter "yes" or "no". (Defaults to "no".)
  - IMPORTANT: When starting up the container, give it the same name that you used for the microservice, because the middleware finds the correct container ID of your container by matching the container name to the microservice name you input as 1st argument.
  - Don't forget to bind mount to Docker socket. See NEW FEATURE section above.

String parameter example:
```javascript
app.use('/', cmd.microCom('payments', 'mongo', 'mongodb+srv://user:password@cluster0-abc.mongodb.net/','yes','m','no'))
```

Array parameter example:
```javascript
let values = [
  'payments',
  'mongo',
  'mongodb+srv://user:password@cluster0-abc.mongodb.net/',
  'no',
  'h',
  'yes'
]

app.use('/', cmd.microCom(values)
```
#### Microservice Test Suite

Additionally, the repo includes a test suite of microservices utilizing the Chronos node module so that their communication, health, and container data can be logged. You can then visualize the data with the Electron app. 

The microservices include individual Dockerfiles in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together. 

Refer to the [README](https://github.com/oslabs-beta/Chronos/tree/docker/microservice) of that branch for more details.

#### Electron desktop application

After installing the node module in each microservice, download the Electron desktop application from the public [Chronos](https://github.com/oslabs-beta/Chronos) repo.

Inside the downloaded directory, install all dependencies using the `npm install` command followed by the `npm start` command to start the Electron desktop application.

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People

[Tim Atapagra](https://github.com/timpagra),
[Brian Bui](https://github.com/Umius-Brian), 
[Mohtasim Chowdhury](https://github.com/mohtasim317),
[Ousman Diallo](https://github.com/Dialloousman),
[Michelle Herrera](https://github.com/mesherrera),
[Alan Lee](https://github.com/ajlee12/), 
[Duane McFarlane](https://github.com/Duane11003),
[Ben Mizel](https://github.com/ben-mizel),
[Alon Ofengart](https://github.com/alon25), 
[Jenae Pennie](https://github.com/jenaepen),
[Chris Romano](https://github.com/robicano22),
[Brianna Sookhoo](https://github.com/briannasookhoo),
[Natalie Umanzor](https://github.com/nmczormick)

## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)