 # Chronos 7

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, and containers. Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

## <div height=22 > What's New? </div>
- Metric query tool so you can filter out specific metrics — now you only have to see what you want on the dashboard.
- Additional metrics added, bringing Chronos up from only 12 to 100+ metrics that are currently available
- Option to filter by category and individual metric, and flip between services and categories with ease
- Apache Kafka monitoring capability, all you need to do is run Prometheus JMX exporter on the system your Chronos application is running on. A sample JMX config.yaml file is provided in the Chronos repository for a quick and easy setup, however you are free to configure however you like.
- Bug fixes and UI tweaks — Chronos is now a more seamless experience than ever.
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

You will also need to add the following two lines of code to your express server:,

```js
// Example for REST
const express = require('express');
const app = express();

```

you will also need to require in `chronos-tracker-7` and initialize Chronos, as well as the `./chronos-config` file in addition to implementing `chronos.track()` for all endpoints.

```js
const chronos = require('chronos-tracker');
require('./chronos-config'); // Bring in config file

// ...

app.use('/', chronos.track());
```

You should be good to go! The steps below for **Docker Configuration** and **Kafka Configuration**, are **only applicable** if you need to configure <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> or Kafka for your application. See the **Notifications** section below for information on how to uses the notifications propery in `chronos-config.js`.

<br>

#### Initialize Chronos Tracker for gRPC

Wherever you create an instance of your server (see example below),


```js
  // Example of gRPC server
  const server = new grpc.Server();

  server.bindAsync("127.0.0.1:30044", grpc.   ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Server running at http://127.0.0.1:30044");
});
```
you will also need to require Chronos-tracker, Chronos-config, and dotenv.config(if this is used). For health data, simply use Chronos.track()



```js
//track health data
const chronos = require('chronos-tracker');
require('./chronos-config');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./BookModel');

chronos.track()
```
To trace requests, first wrap the gRPC client using Chronos
```js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const chronos = require('chronos');

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

### Apache Monitoring (Via JMX to Prometheus Exporter)

Chronos now offers the ability to monitor an Apache Kafka cluster via JMX to Prometheus Exporter. In order for this feature to work you must be running [JMX to Prometheus
Exporter](https://github.com/prometheus/jmx_exporter) either as a Java Agent with your cluster or as a standalone HTTP server. Then, use `chronos-config.js` to specifiy the port exposed for metrics scraping.

To start, add the property `jmxuri` to the object in `chronos-config.js`. Your file should look similar to this:

```js
const chronos = require('chronos-tracker-7');

chronos.use({
  microservice: 'payments',
  interval: 5000,
  dockerized: true,
  jmxuri: // your URI here
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.URI,
  },
  notifications: [],
});
```
The `jmxuri` property should be a string whose value is the port specified for scraping when starting the exporter.

Then, in ***ONE AND ONLY ONE** of your microservices, call

```js

chronos.kafka()

```

in your express server. When viewing your information in the Chronos Electron application the data will be available in the service "kafkametrics"

### Docker Configuration

Again, this step is **only applicable** if you are currently using <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> containers for your microservices. 

<a href="#"><img src="./app/assets/important.png" alt="Important" title="Important" align="center" height="20" /></a> Give your containers the same names you pass in as arguments for microservice names.

<a href="#"><img src="./app/assets/important.png" alt="Important" title="Important" align="center" height="20" /></a> In order to have container statistics saved to your database along with other health info, bind volumes to this path when starting up the containers:
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

## Notifications

The `notifications` property is optional and allows developers to be alerted when the server responds to requests with status codes >= 400. To set up notifications, set the value of the `notifications` property to an array of objects, each with a `type` and `settings` property. 

Chronos only supports **Slack** and **email** notifications.
<br>

### Slack

Chronos uses the <a href="#"><img src="./app/assets/slack-logo-color.png" alt="Slack" title="Slack" align="center" height="20" /></a> API to send messages to a Slack channel and only requires the **webhook url**. Learn how to set up [Slack webhooks](https://api.slack.com/messaging/webhooks) for your team.

An example of configured **slack** settings:

```js
// ...
notifications: [
  {
    type: 'email',
    settings: {
      slackurl: process.env.WEBHOOK
    }
  }
]
// ...
```

### Email
Chronos provides the option to send <a href="#"><img src="./app/assets/email-icon-black.png" alt="Slack" title="Slack" align="center" height="20" /></a> emails. The properties that should be provided are the following
- `emails` - The recipient list (string) can be a single email address or multiple as comma seprated values. 
- `emailHost` - The smtp host (string) of your email server
- `emailPort` - The email port (integer) is either **465** or **587** depending on the sender email security settings. Learn more about email ports by reading the [nodemailer docs](https://nodemailer.com/smtp/)
- `user` - The email address (string) of the sender
- `password` - The password (string) of the sender email

_NOTE: Email notification settings may require alternative security settings to work_
 
An example of configured **email** settings:

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
#
###### Return to [Top](#chronos)
<br>