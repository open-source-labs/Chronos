## What's New?

- Enhanced Metrics Collection: Docker now supports Prometheus metrics scraping, offering improved monitoring capabilities
- Streamlined Visualization: Docker and Kubernetes integrate with Grafana to provide dynamic visualization of collected metrics
- Kubernetes graph type customization and resource data processing
- Bug Fixes
- Refactored code for additional modularity and customization

#

## Features

- Distributed tracing enabled across microservice applications
- Supports PostgreSQL and MongoDB databases
- Displays real-time temperature, speed, latency, and memory statistics
- Display and compare multiple microservice metrics in a single graph
- Monitor an Apache Kafka cluster via the JMX Prometheus Exporter
- Monitor Docker and Kubernetes clusters via a Prometheus monitoring server and display charts using Grafana

#

## Using Chronos

The following steps should be performed in each microservice you want to track unless otherwise noted.

### 1. Install Chronos Tracker

Install the package as a dependency in each of the microservices you want to track:

```
npm install @chronosmicro/tracker
```

### 2. Configuring Chronos Tracker

Create a `chronos-config.js` file, which exports a JavaScript object with required Chronos configuration parameters. Use this configuration to customize Chronos for your specific microservice environment.

```js
// A sample `chronos-config.js` file
//replace the values with your specific configuration

module.exports = {
  // General Configuration
  microservice: 'my-service', //Name of your microservice. For **Dockerized** microservices, this field **must** match the container_name of the corresponding Docker container.
  interval: 10000, //monitoring interval in milliseconds, if ommitted, Chronos will default to recording server health every 60000 ms.

  // Database Information
  database: {
    connection: 'REST', // Choose 'REST' or 'gRPC' for your connection type
    type: 'MongoDB', // Choose 'MongoDB' or 'PostgreSQL'
    URI: '<insert URI>', // should be a connection string to the database where you intend Chronos to write and record data regarding health, HTTP route tracing, and container infomation
  },

  /*  USE ONLY ONE OF THE CONFIGURATIONS BELOW:   */
  // (a) Microservices Mode
  mode: 'microservices',
  dockerized: false, // set to true if your service is Dockerized

  // (b) Kubernetes
  mode: 'kubernetes',
  promService: 'prometheus-service', // Prometheus service name
  promPort: 8080, //Prometheus service port
  grafanaAPIKey: process.env.CHRONOS_GRAFANA_API_KEY, //API for Grafana

  // (c) Apache Kafka
  mode: 'kafka',
  jmxuri: '<insert URI>', //URI for JMX to Prometheus Exporter

  // (d) Docker
  mode: 'docker',
  promService: 'docker.for.mac.localhost', //Prometheus service for Docker
  promPort: 9090, //Prometheus service port
  grafanaAPIKey: process.env.CHRONOS_GRAFANA_API_KEY, //API key for Grafana

  // Notifications
  //Add notification configurations here
  notifications: [],
};
```

Note: Consider using a `.env` file to securely store sensitive parameters like database URIs.

### 3. Configuring notifications

The `notifications` property is an array that can be optionally left empty. It allows developers to be alerted when the server responds to requests with status codes >= 400. To set up notifications, set the value of the `notifications` property to an array of objects, each with a `type` and `settings` property.

Chronos only supports **Slack** and **email** notifications at this time.

**Slack**

```js
// ...
notifications: [
  {
    type: 'slack',
    settings: {
      slackurl: process.env.WEBHOOK,
    },
  },
];
// ...
```

Chronos uses the Slack API to send messages to a Slack channel and only requires the **webhook url**. Learn how to set up [Slack webhooks](https://api.slack.com/messaging/webhooks) for your team.

**Email**

```js
// ...
notifications: [
  {
    type: 'email',
    settings: {
      emails: 'foobar@email.com, bizbaz@email.edu', //can be single or multiple, separated by a comma
      emailHost: 'smpt@gmail.com', // the smtp host of your email server
      emailPort: 465, // the email port is either **465** or **587** depending on the sender email security settings. Learn more about email ports by reading the [nodemailer docs](https://nodemailer.com/smtp/)
      user: process.env.SENDER_EMAIL, //email address of the sender
      password: process.env.SENDER_PASSWORD, //password of the sender's email
    },
  },
];
```

### 4. Utilize `chronos-config.js` in your application

To integrate the `chronos-config.js` file into your application, follow these steps:

1. importing the `chronos-config.js` file

```js
const chronosConfig = require('./chronos-config.js');
```

2. importing the Chronos class

```js
const Chronos = require('@chronosmicro/tracker');
```

3. creating a new instance of the Chronos class

```js
const chronos = new Chronos(chronosConfig);
```

#

### Mode Specific Configurations

### A. Chronos Tracker for "Microservices" Mode

In the `microservices` mode, Chronos employs the `dockerized` setting to determine the operational environment of the microservice.

- `dockerized`: This setting is crucial for specifying the nature of the service deployment.
  - Default Setting: If `dockerized` is not explicitly set to true, Chronos defaults to assuming that the service is not operating in a Docker container environment. Hence, the default value of `dockerized` is false.
  - When `dockerized` is `false`: This configuration tells Chronos to collect metrics directly from the host system. It's applicable for services running outside of Docker containers.
  - When `dockerized` is `true`: This configuration directs Chronos to retrieve metrics from the Docker daemon, aligning with services deployed within Docker containers for accurate monitoring.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'microservices',
  dockerized: false, // false or true

  // ...
};
```

Once your `chronos-config.js` file is setup, use Chronos in your microservice by importing the config, creating a new instance of the class, and calling the `Chronos.track` method to start saving health metrics:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.track();
```

If you are using an Express.js REST API, calling `Chronos.track()` returns middleware that allows users to track incoming network requests and their corresponding outgoing responses by marking them with unique IDs using `Chronos.propagate`.

If you want to utilize this feature, setup a catchall route that will serve as a pass through for tracking and chain in the middleware from `Chronos.track`.

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

**IMPORTANT:** Give your containers the same names you pass in as arguments for microservice names.

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

#

### B. Chronos Tracker for "Kubernetes" Mode

Chronos monitors Kubernetes clusters in two steps. First, it saves metric data from instant queries to a Prometheus server in your Kubernetes cluster. Then, it displays all metrics data through Grafana dashboards.

In `chronos-config.js`, set the `mode` to `kubernetes` and pass it both the name of the port the Prometheus server is listening on INSIDE the cluster, and the name of the Prometheus service so that its IP address can be resolved using KubeDNS.

Also add a `grafanaAPIKey` section, this API key will grant chronos access to create and update dashboards in Grafana. Be sure to include `CHRONOS_GRAFANA_API_KEY` in your `.env` with `Bearer [the access token you get from Grafana]`. For more details, please check Kubernetes example.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'kubernetes',
  promService: 'prometheus-service',
  promPort: 8080,

  grafanaAPIKey: process.env.CHRONOS_GRAFANA_API_KEY,

  // ...
};
```

Then, insert the code below into a **SINGLE** microservice that will be deployed only as a **SINGLE** pod (to avoid saving the same metrics as queried by multiple pods), call `Chronos.kuberbetes`:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.kubernetes();
```

#

### C. Chronos Tracker for "Kafka" Mode

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
};
```

Then, in **ONE AND ONLY ONE** of your microservices, call `Chronos.kafka`:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.kafka();
```

When viewing your information in the Chronos Electron application the data will be available in the service "kafkametrics"

**NOTE:** We provide a jmx_config.yaml file in the Chronos root folder for use with JMX prometheus that provides some useful baseline metrics to monitor.

#

### D. Chronos Tracker for "Docker" Mode

Chronos monitors Docker containers by storing metric data through instant Prometheus queries within your Docker container environment.

In `chronos-config.js`, configure the `mode` parameter to `docker`. Additionally, provide the name of the port where the Prometheus server is actively listening inside the container, and specify the name of the Prometheus service to enable DNS-based resolution of its IP address.

Also add a `grafanaAPIKey` section, this API key will authorize Chronos for dashboard creation and updates in Grafana.

```js
// Excerpt from a chronos-config.js

module.exports = {
  // ...

  mode: 'docker',
  promService: 'docker.for.mac.localhost',
  promPort: 8080,

  grafanaAPIKey: process.env.CHRONOS_GRAFANA_API_KEY,

  // ...
};
```

Then, implement the subsequent code snippet within a **SINGLE** microservice that will be deployed only as a **SINGLE** container, and call `Chronos.docker`:

```js
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.docker();
```

#

### Chronos Tracker for gRPC

To monitor your gRPC server, setup `chronos-config.js` as if it was a standard microservices example, but be sure to set the `connection` type to `gRPC`.

```js
module.exports = {
  microservice: 'my-service',
  interval: 10000,

  // Database Information
  database: {
    connection: 'gRPC', // 'REST' or 'gRPC'
    type: 'MongoDB', // 'MongoDB' or 'PostgreSQL'
    URI: '<insert URI>', // <insert URI>
  },

  mode: 'microservices',
  dockerized: false, // false or true

  // ...
};
```

Then require in the `chronos-config.js` and `Chronos` and call `Chronos.track` to start tracking health metrics.

```js
// Example of gRPC server
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');

const chronos = new Chronos(chronosConfig);
chronos.track();

const server = new grpc.Server();

server.bindAsync('127.0.0.1:30044', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Server running at http://127.0.0.1:30044');
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
const ServerWrapper = chronos.ServerWrapper(server, Proto.protoname.service, {
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

## Examples

We provide working example microservice applications in Chronos desktop app repo in the [**examples**](../chronos_npm_package/README.md) folder.

#

## Technologies

- Electron
- JavaScript
- TypeScript
- PostgreSQL
- MongoDB
- Node
- Express
- HTTP
- gRPC
- Docker
- Apache Kafka
- Docker
- Kubernetes

#

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

Read our [contributing README](../../CONTRIBUTING.md) to further learn how you can take part in improving Chronos.

#

## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)

#

###### Return to [Top](#whats-new)
