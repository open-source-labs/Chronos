<a href="https://chronoslany.com/">
    <img src="./app/assets/animated_logo.gif" alt="Chronos" title="Chronos" align="center" height="500" />
</a>


#
![Build Passing](https://img.shields.io/badge/build-passing-blue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Release: 5.2](https://img.shields.io/badge/Release-5.1-orange)


# Chronos 

### :star: Star us on GitHub — it helps! :star:

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, and containers. Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
    - [Pre-Installation](#pre-installation)
    - [Install Dependencies](#install-dependencies)
    - [Configure Chronos Tracker](#configure-chronos-tracker)
    - [Initialize Chronos Tracker](#initialize-chronos-tracker)
    - [Docker Configuration](#docker-configuration)
    - [Kafka Configuration](#Apache-Monitoring-(Via-JMX-to-Prometheus-Exporter))
    - [Start Chronos](#start-chronos)
    - [Getting the Executable](#getting-the-chronos-executable)
- [Notifications](#notifications)
    - [Slack](#slack)
    - [Email](#email)
- [Branches](#branches)
    - [Master Branch](#master-branch)
      - [Examples](#examples)
        - [Microservices](#microservices)
        - [Docker](#docker)
    - [gRPC Branch](#grpc-branch)
    - [Splash Page](#chronoswebsite)
- [Technologies](#technologies)
- [License](#license)

#
###### Return to [Top](#chronos)
<br>

## <img src ="./app/assets/fire.png" height=22 > What's New? <img src ="./app/assets/fire.png" height=24>


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
- Display and compare multiple microservice metrics in a single graph
- Monitor an <a href="#"><img src="./app/assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter

#
###### Return to [Top](#chronos)
<br>

## Demo
<br>
<br>
Signing Up
<br>
<br>
<a href="#"><img src="./app/assets/enable_sign_up.gif" alt="Chronos-Demo" title="Chronos-Demo" align="center" height="500" /></a></a>
<br>
<br>
Using the Query Tool
<br>
<br>
<a href="#"><img src="./app/assets/query_tool.gif" alt="Query-Tool-Demo" title="Query-Tool-Demo" align="center" height="475" /></a></a>

#
###### Return to [Top](#chronos)
<br>

## Installation
This is for the latest Chronos version **5.2 release and later**.

- Stable release: 7.0.0
- LTS release: 7.0.0

### Pre-Installation
Make sure you're running version 14.16.1 of <a href="#"><img src="./app/assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /></a></a>, which is the most recent LTS (long-term support) version. 

If you need to roll back from <a href="#"><img src="./app/assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /></a> 16.1.0, make sure to run 
```npm rebuild```
in the root directory.

If you're installing Chronos into a microservices application, and you have different folders for each microservice, make sure you also run 
```npm rebuild```
in each microservices folder **after you roll back to version 14.16.1.**

**If you wish to launch the Electron Application in an WSL2 envirronment(Ubuntu) you may need the following commands for an Electron window to appear**

- Install <a href='https://sourceforge.net/projects/vcxsrv/'>VcXsrv</a>

- Run the following command in the terminal

```
sudo apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev
```

- After running your VcXsrv instance, run the following command in the terminal
```
export DISPLAY="`sed -n 's/nameserver //p' /etc/resolv.conf`:0"
```

<br>

### Install Dependencies

To use Chronos in your existing application, download and install the following in the **root directory** of _each of your microservice applications_:
```
npm install chronos-tracker-7
```

### Configuring Chronos Tracker

Similarly, in the **root directory** of _each of your microservice applications_, create a `chronos-config.js` file with properties listed below:

```js
// A sample `chronos-config.js` file

const chronos = require('chronos-tracker-7');

chronos.use({
  microservice: 'payments',
  interval: 5000,
  dockerized: true, // <-- The 'dockerized' property is optional
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

You will also need to require in `chronos-tracker-7` and initialize Chronos, as well as the `./chronos-config` file in addition to implementing `chronos.track()` for all endpoints.

```js
const chronos = require('chronos-tracker-7');
require('./chronos-config'); // Bring in config file

// ...

app.use('/', chronos.track());
```

You should be good to go! The steps below for **Docker Configuration** and **Kafka Configuration**, are **only applicable** if you need to configure <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> or Kafka for your application. See the **Notifications** section below for information on how to uses the notifications propery in `chronos-config.js`.



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
const chronos = require('chronos-tracker-7');
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



### Apache Kafka Monitoring (Via JMX to Prometheus Exporter)

Chronos now offers the ability to monitor an Apache Kafka cluster via JMX to Prometheus Exporter. In order for this feature to work you must be running [JMX to Prometheus
Exporter](https://github.com/prometheus/jmx_exporter) either as a Java Agent with your cluster or as a standalone HTTP server. Then, use `chronos-config.js` to specifiy the port exposed for metrics scraping.

To start, add the property `jmxuri` to the object in `chronos-config.js`. Your file should look similar to below. Add this property to `chronos-config.js` in ***ONE AND ONLY ONE** of your microservices:

```js
const chronos = require('chronos-tracker-7');

chronos.use({
  microservice: 'payments',
  interval: 5000,
  dockerized: false,
  jmxuri: 'http://localhost:12345/metrics', // your URI here
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

**NOTE:** We provide a config.yaml file in the Chronos root folder for use with JMX prometheus that provides some useful baseline metrics to monitor.

#
###### Return to [Top](#chronos)
<br>

### Start Chronos

Once you have configured and intialized Chronos Tracker, it will automatically record monitoring data when your servers are running. Finally, start the Chronos desktop app to view that data! After cloning our [GitHub repo](https://github.com/open-source-labs/Chronos), run `npm install` and `npm run both` to start Chronos.
  
### Getting the Chronos Executable  
At the current moment, to get a copy of the executable that works on all OS, the steps are 1) clone the master branch, 2) run `npm i`, 3) run `npm run prepareDist`, 4) run `npm run package-any`, 5) navigate in your Chronos folder `./release-builds/resources` and click on `chronos.exe`. 6) optionally right click to create a shortcut.

#
###### Return to [Top](#chronos)
<br>

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

## Branches

### Master Branch

The **'master'** branch of this repository is where the <a href="#"><img src="./app/assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> application for Chronos is deployed. The Chronos monitoring tool includes two database examples, one PostgresQL and one MongoDB, with sample data sets.

**NOTE:** To _replace_ or _delete_ these two databases, simply change the database URIs stored in the following path: 
```
root directory -> electron -> user -> settings.json
```

### _Examples_

We provide two working example microservice applications in the `master` branch for you to test out Chronos: `microservices` and `docker`.

#### _Microservices_

In the `microservices` folder, we provide a sample microservice application that successfully utilizes Chronos to apply all the powerful, built-in features of our  monitoring tool. You can then visualize the data with the <img src="./app/assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> app.

Refer to the [README](link) in the `microservices` folder for more details.

#### _Docker_

In the <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> folder within the `master` branch, we provide a sample _dockerized_ microservices application to test out Chronos and to apply distributed tracing across different containers for your testing convenience.

The `docker` folder includes individual <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> files in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together.

Refer to the [README](link) in the `docker` folder for more details.

<br>

## chronosWebsite  
This is the branch that holds the code base for the splash page. Edit the website by first running `git clone -b chronosWebsite https://github.com/open-source-labs/Chronos.git .` and then updating the aws S3 bucket with the changes.

#
###### Return to [Top](#chronos)
<br>

## Technologies

- <a href="#"><img src="./app/assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/react-logo-color.png" alt="React" title="React" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/js-logo-color.png" alt="JavaScript" title="JavaScript" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/ts-logo-long-blue.png" alt="TypeScript" title="TypeScript" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/node-logo-color.png" alt="Node" title="Node" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/express-logo-color.png" alt="Express" title="Express" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/http-logo-color.png" alt="HTTP" title="HTTP" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/grpc-logo-color.png" alt="gRPC" title="gRPC" align="center" height="30" /></a> 
- <a href="#"><img src="./app/assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/jest-logo-color.png" alt="Jest" title="Jest" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/enzyme-logo-color.png" alt="Enzyme" title="Enzyme" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/spectron-logo-color.png" alt="Spectron" title="Spectron" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/webpack-logo-color.png" alt="Webpack" title="Webpack" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/material-ui-logo-color.png" alt="Material-UI" title="Material-UI" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/vis-logo-color.png" alt="Vis.js" title="Vis.js" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/plotly-logo-color.png" alt="Plotly.js" title="Plotly.js" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="30" /></a>
- <a href="#"><img src="./app/assets/AntDesign.svg" alt="Ant Design" title="Ant Design" align="center" height="30" /></a>
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

Chronos is <a href="#"><img src="./app/assets/mit-logo-color.png" alt="MIT" title="MIT" align="center" height="20" /></a> [licensed.](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md) 
#
###### Return to [Top](#chronos)
