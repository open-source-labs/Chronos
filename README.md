<a href="https://chronoslany.com/">
    <img src="assets/animated_logo.gif" alt="Chronos" title="Chronos" align="center" height="500" />
</a>

<br>

![Build Passing](https://img.shields.io/badge/build-passing-blue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Release: 5.2](https://img.shields.io/badge/Release-5.1-orange)

#
# Chronos 

### Star us on GitHub — it helps!
Visit our splash page at [chronoslany.com](https://chronoslany.com/)

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, and containers. Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

#

## What's New?
- Metric query tool so you can filter out specific metrics — now you only have to see what you want on the dashboard and reduce database bloat, keeping your database from being overwhelmed with data points that you don't actually need. 
- Kubernetes metrics monitoring via Prometheus.
- Additional metrics added, bringing Chronos up from only 12 to 100+ metrics that are currently available
- Option to filter by category and individual metric, and flip between services and categories with ease
- Apache Kafka monitoring capability, all you need to do is run Prometheus JMX exporter on the system your Chronos application is running on. A sample JMX config.yaml file is provided in the Chronos repository for a quick and easy setup, however you are free to configure however you like.
- Bug fixes and UI tweaks — Chronos is now a more seamless experience than ever.

## Features 
- Distributed tracing enabled across microservices applications
- Kubernetes monitoring via Prometheus server
- Compatible with <img src="assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="20" /></a>
- Supports <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases
- Displays real-time temperature, speed, latency, and memory statistics
- Display and compare multiple microservice metrics in a single graph
- Monitor an <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter
- Monitor a Kubernetes cluster via a Prometheus monitoring server

#

## Demo
<br>
<br>
Signing Up
<br>
<br>
<a href="#"><img src="assets/enable_sign_up.gif" alt="Chronos-Demo" title="Chronos-Demo" align="center" height="500" /></a></a>
<br>
<br>
Using the Query Tool
<br>
<br>
<a href="#"><img src="assets/query_tool.gif" alt="Query-Tool-Demo" title="Query-Tool-Demo" align="center" height="475" /></a></a>

#

## Installation
This is for the latest Chronos **version 8 release**.

**NOTE:** The Chronos tracker code is included in the *chronos_npm_package* folder for ease of development, but the published npm package can be downloaded by running `npm install @chronosmicro/tracker`

<br>

### Node Version
Make sure you're running version 16.17.1 of <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" />, to align with the <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /> version used by <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /> version 22. 

<br>

### WSL2 Environment
If you wish to launch the Electron Application in an WSL2 envirronment(Ubuntu) you may need the following commands for an Electron window to appear

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

### Running the Chronos Desktop App in Development Mode
1. From the root directory, run `npm install`
2. Open a terminal and run `npm run dev:app` to start the Webpack development server
3. Open another terminal and run `npm run dev:electron` to start the Electron UI in development mode

### Packing the Chronos App into an Executable
1. From the root directory, run `npm run build`
2. Run `npm package`
3. Find the `chronos.app` executable inside the newly created `release-builds` folder in the root directory.

#

## Chronos Tracker Microservice Examples
We provide three working example microservice applications branch for you to test out Chronos:
- *examples/microservices*
- *examples/docker*
- *examples/kubernetes*

#### _Microservices_
In the `microservices` folder, we provide a sample microservice application that successfully utilizes Chronos to apply all the powerful, built-in features of our  monitoring tool. You can then visualize the data with the <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> app.

Refer to the [README](link) in the `microservices` folder for more details.

#### _Docker_
In the <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> folder within the `master` branch, we provide a sample _dockerized_ microservices application to test out Chronos and to apply distributed tracing across different containers for your testing convenience.

The `docker` folder includes individual <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> files in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together.

Refer to the [README](link) in the `docker` folder for more details.

<br>

#### _Kubernetes_
The `kubernetes` folder includes a React frontend and an Express server backend, and the Dockerfiles needed to containerize them for Kubernetes deployment. The *launch* folder includes the YAML files needed to configure the deployments, services, and configurations of the frontend, backend, and Prometheus server.


Refer to the [README](link) in the `kubernetes` folder for more details.

<br>

## Chronos Website  
The `chronosWebsite` branch holds the code for the splash page. Edit the website by checking out the branch, modifying the website, and then updating the AWS S3 bucket with the changes.

#
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
- <a href="#"><img src="assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="30" /></a>
- <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="30" /></a>
- <a href="#"><img src="assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="30" /></a>
- <a href="#"><img src="assets/jest-logo-color.png" alt="Jest" title="Jest" align="center" height="30" /></a>
- <a href="#"><img src="assets/webpack-logo-color.png" alt="Webpack" title="Webpack" align="center" height="30" /></a>
- <a href="#"><img src="assets/material-ui-logo-color.png" alt="Material-UI" title="Material-UI" align="center" height="30" /></a>
- <a href="#"><img src="assets/vis-logo-color.png" alt="Vis.js" title="Vis.js" align="center" height="30" /></a>
- <a href="#"><img src="assets/plotly-logo-color.png" alt="Plotly.js" title="Plotly.js" align="center" height="30" /></a>
- <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="30" /></a>

#

## Contributing

Development of Chronos is open source on GitHub through the tech accelerator umbrella OS Labs, and we are grateful to the community for contributing bug fixes and improvements. Read below to learn how you can take part in improving Chronos.

- [Contributing](https://github.com/oslabs-beta/Chronos/blob/master/CONTRIBUTING.md)
#

## License

Chronos is [MIT licensed.](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)
#
###### Return to [Top](#chronos)
