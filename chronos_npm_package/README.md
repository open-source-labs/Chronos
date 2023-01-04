<a href="https://chronoslany.com/">
    <img src="assets/animated_logo.gif" alt="Chronos" title="Chronos" align="center" height="500" />
</a>
<br>
<br>


# Chronos 
![Build Passing](https://img.shields.io/badge/build-passing-blue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Release: 8.0.1](https://img.shields.io/badge/Release-8.0.1-orange)

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, and containers. Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

#

## What's New?
- Metric query tool so you can filter out specific metrics — now you only have to see what you want on the dashboard.
- Additional metrics added, bringing Chronos up from only 12 to 100+ metrics that are currently available
- Option to filter by category and individual metric, and flip between services and categories with ease
- Kubernetes monitoring via Prometheus server
- Apache Kafka monitoring capability, all you need to do is run Prometheus JMX exporter on the system your Chronos application is running on. A sample JMX config.yaml file is provided in the Chronos repository for a quick and easy setup, however you are free to configure however you like.
- Bug fixes and UI tweaks — Chronos is now a more seamless experience than ever.

#

## Features 
- Distributed tracing enabled across microservice applications
- Supports <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases
- Displays real-time temperature, speed, latency, and memory statistics
- Display and compare multiple microservice metrics in a single graph
- Monitor an <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter
- Monitor a Kubernetes cluster via a Prometheus monitoring server

#

## Using Chronos
The following steps should be performed in each microservice you want to track unless otherwise noted.

### Install Chronos Tracker
Install the package as a dependency in each of the microservices you want to track:

```
npm install @chronosmicro/tracker
```

<br>

### Configuring Chronos Tracker
Create a `.js` Chronos configuration file (hereby referred to as `chronos-config.js`), which exports a JavaScript object with required Chronos configuration parameters. This object will be used as the sole Chronos class constructor argument. Feel free to use a `.env` file to hold sensitive parameters like the database URI, for example.

```js
// A sample `chronos-config.js` file

module.exports = {
  // General Configuration
  microservice: 'my-service',
  interval: 10000,

  // Database Information
  database: {
  connection: 'REST',   // 'REST' or 'gRPC'
  type: 'MongoDB',      // 'MongoDB' or 'PostgreSQL'
  URI: '<insert URI>',  // <insert URI>
  },

  /*  USE ONE OF THE MODE-SPECIFIC CONFIGURATIONS BELOW   */
  // (a) Microservices
  mode: 'microservices',
  dockerized: false,  // false or true

  // (b) Kubernetes
  mode: 'kubernetes',
  promService: 'prometheus-service',
  promPort: 8080,

  // (c) Apache Kafka
  mode: 'kafka',
  jmxuri: '<insert URI>',
  /*  USE ONE OF THE MODE-SPECIFIC CONFIGURATIONS ABOVE   */

  // Notifications
  notifications: [],
}
```

Then utilize the `chronos-config.js` file into your microservice application by importing it and using it as the Chronos class constructor argument:
```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
```

<br>

#### Chronos Configuration Parameters
_See mode-specific configuration descriptions in the "Chronos Tracker for Microservices" section_

The `microservice` property takes in a string. This should be a descriptive name for your microservice.

- <img src="assets/important.png" alt="Important" title="Important" align="center" height="20" /> For **Dockerized** microservices, this field **must** match the _container_name_ of the corresponding Docker container.

The `interval` property is optional and takes in an integer. This controls the Chronos monitoring frequency. If this is omitted, Chronos will default to recording server health every 60000 ms or 60 seconds.

The `database` property is required and takes in the following:
- `connection` is a string that should should be either 'REST' or 'gRPC'
- `type` should be a string and only supports 'MongoDB' and 'PostgreSQL' at this time
- `URI` should be a connection string to the database where you intend Chronos to write and record data regarding health, HTTP route tracing, and container infomation

The `mode` property accepts a string that can either be 'microservices', 'kubernetes', or 'kafka'. There are other settings that depend on the mode choice, so these are broken down in the "Chronos Tracker for Microservices" section.

The `notifications` property is an array that can be optionally left empty. It allows developers to be alerted when the server responds to requests with status codes >= 400. To set up notifications, set the value of the `notifications` property to an array of objects, each with a `type` and `settings` property. 

Chronos only supports **Slack** and **email** notifications at this time.

**Slack**
```js
// ...
notifications: [
  {
    type: 'slack',
    settings: {
      slackurl: process.env.WEBHOOK
    }
  }
]
// ...
```
Chronos uses the <a href="#"><img src="assets/slack-logo-color.png" alt="Slack" title="Slack" align="center" height="20" /></a> API to send messages to a Slack channel and only requires the **webhook url**. Learn how to set up [Slack webhooks](https://api.slack.com/messaging/webhooks) for your team.

**Email**
```js
// ...
notifications: [
  {
    type: 'email',
    settings: {
      emails: 'foobar@email.com, bizbaz@email.edu',
      emailHost: 'smpt@gmail.com',
      emailPort: 465,
      user: process.env.SENDER_EMAIL,
      password: process.env.SENDER_PASSWORD
    }
  }
]
// ...
```

Chronos provides the option to send  emails. The properties that should be provided are the following
- `emails` - The recipient list (string) can be a single email address or multiple as comma seprated values. 
- `emailHost` - The smtp host (string) of your email server
- `emailPort` - The email port (integer) is either **465** or **587** depending on the sender email security settings. Learn more about email ports by reading the [nodemailer docs](https://nodemailer.com/smtp/)
- `user` - The email address (string) of the sender
- `password` - The password (string) of the sender email

_NOTE: Email notification settings may require alternative security settings to work_

<br>

### Chronos Tracker for "Microservices" Mode
The mode `microservices` uses the additional setting `dockerized`, which indicates whether or not the microservice has been containerized with <img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" />. If omitted, Chronos will assume this server is not running in a container, i.e. `dockerized` will default to _false_. 

Setting the flag to _false_ will collect metrics from the host computer directly, while _true_ indicates for Chronos to pull metrics from the Docker daemon.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'microservices',
  dockerized: false,  // false or true

  // ...
}
```

Once your `chronos-config.js` file is setup, use Chronos in your microservice by importing the config, creating a new instance of the class, and calling the `Chronos.track` method to start saving health metrics:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.track()
```

If you are using an Express.js REST API, calling `Chronos.track()` returns middleware that allows users to track incoming network requests and outgoing their corresponding outgoing responses by marking them with unique IDs using `Chronos.propagate`. If you want to utilize this feature, setup a catchall route that will serve as a pass through for tracking and chain in the middleware from `Chronos.track`.

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

// THIS MUST HAPPEN BEFORE CALLING express()!
chronos.propagate();

const app = express();

const trackingMiddleware = chronos.track();
// Pass all requests through this middleware, which always calls next() to allow all requests to continue on to match other routes
app.use('/', trackingMiddleware); 
```

#### Special Notes on Dockerized Microservices
<img src="assets/important.png" alt="Important" title="Important" align="center" height="20" /> Give your containers the same names you pass in as arguments for microservice names.

In order to have container statistics saved to your database along with other health info, bind volumes to this path when starting up the containers:
```
/var/run/docker.sock
```

For example, you can type the following when starting up a container:
```
docker run -v /var/run/docker.sock:/var/run/docker.sock [your-image-tag]
```

If you're using `docker-compose` to start up multiple containers, you can add a `volumes` key for each of your services in the `docker-compose.yml` file:

```
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```
<br>

### Chronos Tracker for "Kubernetes" Mode
Chronos can monitor an Kubernetes clusters by saving metric data from instant queries to a Prometheus server in your Kubernetes cluster. 

In `chronos-config.js`, set the `mode` to `kubernetes` and pass it both the name of the port the Prometheus server is listening on INSIDE the cluster, and the name of the Prometheus service so that its IP address can be resolved using KubeDNS.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'kubernetes',
  promService: 'prometheus-service',
  promPort: 8080,

  // ...
}

```

Then, insert the code below into a **SINGLE** microservice that will be deployed only as a **SINGLE** pod (to avoid saving the same metrics as queried by multiple pods), call `Chronos.kuberbetes`:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.kubernetes();

```


### Chronos Tracker for "Kafka" Mode
Chronos can monitor an Apache Kafka cluster via JMX to Prometheus Exporter. In order for this feature to work you must be running [JMX to Prometheus
Exporter](https://github.com/prometheus/jmx_exporter) either as a Java Agent with your cluster or as a standalone HTTP server. Then, use `chronos-config.js` to specifiy where to retrieve the metrics.

To start, set the `mode` to `kafka` and add the property `jmxuri` to the object in `chronos-config.js`. The `jmxuri` property should be a string whose value is the URL and port specified for scraping when starting the exporter.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'kafka',
  jmxuri: 'http://localhost:12345/metrics',

  // ...
}
```

Then, in ***ONE AND ONLY ONE** of your microservices, call `Chronos.kafka`: 
```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.kafka();
```

When viewing your information in the Chronos Electron application the data will be available in the service "kafkametrics"

**NOTE:** We provide a jmx_config.yaml file in the Chronos root folder for use with JMX prometheus that provides some useful baseline metrics to monitor.

### Chronos Tracker for gRPC

To monitory your gRPC server, setup `chronos-config.js` as if it was a standard microservices example, but be sure to set the `connection` type to `gRPC`.

```js
module.exports = {
  microservice: 'my-service',
  interval: 10000,

  // Database Information
  database: {
  connection: 'gRPC',   // 'REST' or 'gRPC'
  type: 'MongoDB',      // 'MongoDB' or 'PostgreSQL'
  URI: '<insert URI>',  // <insert URI>
  },

  mode: 'microservices',
  dockerized: false,  // false or true

  // ...
}
```

Then require in the `chronos-config.js` and `Chronos` and call `Chronos.track` to start tracking health metrics.
```js
  // Example of gRPC server
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');

const chronos = new Chronos(chronosConfig);
chronos.track()

const server = new grpc.Server();

server.bindAsync("127.0.0.1:30044", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:30044");
});
```

To trace requests, first wrap the gRPC client using Chronos:

```js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './order.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const OrderToBookService = grpc.loadPackageDefinition(packageDefinition).OrderToBook;
const bookClient = new OrderToBookService('localhost:30044', grpc.credentials.createInsecure());

const ClientWrapper = chronos.ClientWrapper(bookClient, OrderToBookService);
```

Next wrap the gRPC server using Chronos 

```js

  const ServerWrapper = chronos.ServerWrapper(server,  Proto.protoname.service, {
    AddBook: (call, callback) => {
    // console.log(call.metadata)
    // get the properties from the gRPC client call
      const { title, author, numberOfPages, publisher, bookID } = call.request;
    // create a book in our book collection
      BookModel.create({
        title,
        author,
        numberOfPages,
        publisher,
        bookID,
      });
      callback(null, {});
    },
  });

```

For any request you wish to trace, require uuidv4 and write the following code where the initial gRPC request begins,

```js
const require { v4: uuidv4} = require('uuid')
const createMeta = () => {
  const meta = new grpc.Metadata();
  meta.add('id', uuidvd());
  return meta
}
```

and then, invoke createMeta as a third argument to any client method that is the beginning of the request path.

```js
orderClient.AddOrder(
    order,
    (err, data) => {
      if (err !== null) {
        console.log(err);
        // could not add order because bookID does not exist
        return res.sendStatus(404);
      }
      console.log('addOrder response: ', data);
      return res.sendStatus(200);
    },
    createMeta()
  );

```
Finally, on all servers that will be involved in the request path, invoke `chronos.link` with parameters of `client` and `ServerWrapper` in the server wrapper.

```js
chronos.link(client, ServerWrapper);
```

#

### Viewing Chronos Data
Once you have configured and intialized Chronos Tracker, it will automatically record monitoring data when your servers are running. The data will be saved into your database of choice, and then start the Chronos desktop app to view by cloning our [GitHub repo](https://github.com/open-source-labs/Chronos). Folow the ReadMe in that repo to setup the Chronos desktop app. 

#

### _Examples_

We provide working example microservice applications in Chronos desktop app repo in the *examples* folder.
[GitHub repo](https://github.com/open-source-labs/Chronos)


###### Return to [Top](#chronos)

<br>

## Technologies

- <a href="#"><img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="30" /></a>
- <a href="#"><img src="assets/react-logo-color.png" alt="React" title="React" align="center" height="30" /></a>
- <a href="#"><img src="assets/js-logo-color.png" alt="JavaScript" title="JavaScript" align="center" height="30" /></a>
- <a href="#"><img src="assets/ts-logo-long-blue.png" alt="TypeScript" title="TypeScript" align="center" height="30" /></a>
- <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="30" /></a>
- <a href="#"><img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="30" /></a>
- <a href="#"><img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="30" /></a>
- <a href="#"><img src="assets/express-logo-color.png" alt="Express" title="Express" align="center" height="30" /></a>
- <a href="#"><img src="assets/http-logo-color.png" alt="HTTP" title="HTTP" align="center" height="30" /></a>
- <a href="#"><img src="assets/grpc-logo-color.png" alt="gRPC" title="gRPC" align="center" height="30" /></a> 
- <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="30" /></a>
- <a href="#"><img src="assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="30" /></a>
- <a href="#"><img src="assets/jest-logo-color.png" alt="Jest" title="Jest" align="center" height="30" /></a>
- <a href="#"><img src="assets/webpack-logo-color.png" alt="Webpack" title="Webpack" align="center" height="30" /></a>
- <a href="#"><img src="assets/material-ui-logo-color.png" alt="Material-UI" title="Material-UI" align="center" height="30" /></a>
- <a href="#"><img src="assets/vis-logo-color.png" alt="Vis.js" title="Vis.js" align="center" height="30" /></a>
- <a href="#"><img src="assets/plotly-logo-color.png" alt="Plotly.js" title="Plotly.js" align="center" height="30" /></a>
- <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="30" /></a>

#
###### Return to [Top](#chronos)
<br>


## Contributing

Development of Chronos is open source on GitHub through the tech accelerator umbrella OS Labs, and we are grateful to the community for contributing bug fixes and improvements. Read below to learn how you can take part in improving Chronos.

- [Contributing](https://github.com/oslabs-beta/Chronos/blob/master/CONTRIBUTING.md)
#
###### Return to [Top](#chronos)
<br>


## License

Chronos is <a href="#"><img src="assets/mit-logo-color.png" alt="MIT" title="MIT" align="center" height="20" /></a> [licensed.](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md) 
#
###### Return to [Top](#chronos)
