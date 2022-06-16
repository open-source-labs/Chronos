 # Chronos 7

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, and containers. Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

## <div height=22 > What's New? </div>
- New Features
  - The ability to monitor an Apache Kafka cluster via the JMX Prometheus Exporter
  - Added 19 new system-level metrics for monitoring!
- Overhauled Features
  - Users can use the new query tool to select the specific metrics that they would 
    like to monitor
## Features     
- Distributed tracing enabled across microservices applications
- Compatible with <img src="./app/assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="20" /></a>
- Supports <a href="#"><img src="./app/assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="./app/assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases
- Displays real-time temperature, speed, latency, and memory statistics
- Display and compare multiple microservice metrics at once
- Monitor an Apache Kafka cluster via the JMX Prometheus Exporter
#
## Installation

To use Chronos in your existing application, download and install the following in the **root directory** of _each of your microservice applications_:
```
npm install chronos-tracker-7
```

### Pre-Installation
Make sure you're running version 14.16.1 of, which is the most recent LTS (long-term support) version. 

If you need to roll back from <a href="#"><img src="./app/assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /></a> 16.1.0, make sure to run 
```npm rebuild```
in the root directory.


<br>

### Configuring Chronos Tracker

Similarly, in the **root directory** of _each of your microservice applications_, create a `chronos-config.js` file with properties listed below:

```js
// A sample `chronos-config.js` file

const chronos = require('chronos-tracker-7');

chronos.use({
  microservice: 'payments',
  interval: 5000,
  dockerized: true,
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.URI,
  },
  notifications: [],
});
```

The `microservice` property takes in a string. This should be the name of your server or microservice. For **Docker** containers, the name of the microservice should be the same as the name of the corresponding Docker container.

The `interval` property is optional and takes in an integer. This controls the Chronos monitoring frequency. If this is omitted, Chronos will default to recording server health every 60000 ms or 60 seconds.

The `dockerized` property is optional and should be specified as `true` if the server is running inside of a Docker container. Otherwise, this should be `false`. If omitted, Chronos will assume this server is not running in a container.

The `database` property is required and takes in the following:
- `connection` should be a string and only supports 'REST' and 'gRPC'
- `type` should be a string and only supports 'MongoDB' and 'PostgreSQL'.
- `URI` should be a connection string to the database where you intend Chronos to write and record data regarding health, HTTP route tracing, and container infomation.
We reccommend using dotenv  

Wherever you create an instance of your server (see example below),

```js
// Example for REST
const express = require('express');
const app = express();

```

you will also need to require in `chronos-tracker` and initialize Chronos, as well as the `./chronos-config` file. You will then need to invoke `chronos.propagate()` to initiate the route tracing, in addition to implementing `chronos.track()` for all endpoints.

```js
const chronos = require('chronos-tracker');
require('./chronos-config'); // Bring in config file

// ...

app.use('/', chronos.track());
```

You should be good to go! The last step, **Docker Configuration**, is **only applicable** if you need to configure <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> for your application. 

<br>
