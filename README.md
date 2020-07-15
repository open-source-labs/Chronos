<p align="center">
  <img src="./app/assets/chronos-v4.png" height=300/>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Release: 4.0](https://img.shields.io/badge/Release-4.0-orange)

# Chronos

> A developer tool that monitors the health and web traffic of servers, microservices, and containers.

## NEW FEATURES FOR 4.0+ - Real-time Data and Docker Container Stats

- Improved user interface & experience
- Real-time data monitoring
- Decreased loading times
- Automated notifications(Slack, email)
- Easier to use configuration file
- Now works on Linux, Mac, and Windows
- Previous versions(less than 4.0) of Chronos are no longer supported


## Core Features
  <!-- * HTTP request tracing -->
- Docker container stats (e.g. ID, memory usage %, CPU usage %, running processes, etc.)
- Temperature, speed, latency, and memory tracking
- Process monitoring

# Quick start

Install dependencies

```
npm install chronos-tracker
```

Create `chronos-config.js` within the **same directory** as your `server.js`

```js
const chronos = require('chronos-tracker');

cmd.use({
  microservice: 'chronos-mon-2',
  interval: 3000,
  dockerized: true,
  database: {
    type: 'MongoDB',
    URI: /* NEW DATABASE URI */,
  },
  notifications: [
    {
      type: 'slack',
      settings: {
        slackurl: /* YOUR SLACK WEBHOOK URL*/,
      },
    },
    {
      type: 'email',
      settings: {
        emails: /* EMAIL RECIPIENT LIST */,
        emailHost: /* EMAIL HOST */,
        emailPort: /* EMAIL PORT */,
        user: /* SENDER EMAIL ADDRESS */,
        password: process.env.EMAIL_PASSWORD,
      },
    },
  ],
});
```

Refer to section setup for more information on these properties


_NOTE: Email notification settings may require alternative security settings to work_

Initialize chronos

```js
const cmd = require('chronos-tracker');
require('./cmd-config'); // Bring in config file

cmd.propagate();
app.use('/', cmd.track());
```

Download Chronos to view your application data [here]()

<!-- # Installation

Chronos consists of a [Node](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) and a lightweight [Electron](https://electronjs.org/) desktop application. -->

# Containerized Applications Using Docker

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

\*Note: This module leverages the features of [systeminformation](https://systeminformation.io/).


## Configuration Setup

- [1] microserviceName: To identify the microservice (i.e. "payments").
  - Make sure this name matches your container name. More details more below (param #6).
  - Your input name for the microservice will be turned to an all-lowercase string.
- [2] databaseType: Enter either "mongo" or "sql".
- [3] databaseURL: Enter the URL of your database.
- [4] wantMicroHealth: Do you want to monitor the health of this microservice? Enter "yes" or "no".
  - Note: If you choose "yes" for this param, the middleware will NOT log container stats. In other words, if you want container stats instead, input "no" here and "yes" for param #6.
- [5] queryFrequency (optional): How frequently do you want to log the health of this microservice? It defaults to every minute, but you can choose:
  - "s" : every second
  - "m" : every minute (default)
  - "h" : every hour
  - "d" : once per day
  - "w" : once per week
- [6] isDockerized: Is this microservice running in a Docker container? Enter "yes" or "no". (Defaults to "no".)
  - IMPORTANT: When starting up the container, give it the same name that you used for the microservice, because the middleware finds the correct container ID of your container by matching the container name to the microservice name you input as 1st argument.
  - Don't forget to bind mount to Docker socket. See NEW FEATURE section above.


## Microservice Test Suite

Additionally, the repo includes a test suite of microservices utilizing the Chronos node module so that their communication, health, and container data can be logged. You can then visualize the data with the Electron app.

The microservices include individual Dockerfiles in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together.

Refer to the [README](https://github.com/oslabs-beta/Chronos/tree/docker/microservice) of that branch for more details.

#### Electron desktop application

After installing the node module in each microservice, download the Electron desktop application from the public [Chronos]() repo.

Inside the downloaded directory, install all dependencies using the `npm install` command followed by the `npm start` command to start the Electron desktop application.

## Contributing

Development of Chronos is open source on GitHub through the tech accelerator umbrella OS Labs, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Chronos.

- [Contributing Guide](https://github.com/oslabs-beta/Chronos/CONTRIBUTING.md)

## People

[Tim Atapagra](https://github.com/timpagra),
[Todd Buckner](https://github.com/tdwolf6),
[Brian Bui](https://github.com/Umius-Brian),
[Ronelle Caguioa](https://github.com/ronellecaguioa),
[Mohtasim Chowdhury](https://github.com/mohtasim317),
[Ousman Diallo](https://github.com/Dialloousman),
[Michelle Herrera](https://github.com/mesherrera),
[Alan Lee](https://github.com/ajlee12/),
[Duane McFarlane](https://github.com/Duane11003),
[Ben Mizel](https://github.com/ben-mizel),
[Alon Ofengart](https://github.com/alon25),
[Greg Palasciano](https://github.com/gregpalace),
[Jenae Pennie](https://github.com/jenaepen),
[Chris Romano](https://github.com/robicano22),
[Brianna Sookhoo](https://github.com/briannasookhoo),
[Natalie Umanzor](https://github.com/nmczormick),
[Michael Wang](https://github.com/wang3101)

## License

Chronos is [MIT licensed.](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md) 
