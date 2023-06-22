<a href="https://chronoslany.com/">
    <img src="assets/animated_logo.gif" alt="Chronos" title="Chronos" align="center" height="500" />
</a>

<br>

![Build Passing](https://img.shields.io/badge/build-awesome-brightgreen)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![Release: 11.0](https://img.shields.io/badge/Release-11.0-brightgreen)


# Chronos


### ⭐️ Star us on GitHub! ⭐️
**Visit our website at [chronoslany.com](https://chronoslany.com/).**

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, containers, and Amazon Web Services (AWS). Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.


## What's New?

### With Chronos 11.0:

- Added interactive charting to better visualize metrics and increase user engagement with their data
- Followed best test-driven development practices and increased testing with React Testing and Jest for the front end
- Overhauled user database security, mitigating database breaches and providing a safer experience
- Bug fixes and UI tweaks, creating a more pleasant user experience
- Updated outdated README instructions within the provided Docker, gRPC, Kubernetes, and microservices examples
- Revised README instructions for the `@chronosmicro/tracker` NPM package


**Previously implemented updates:**
- Streamlined approach to access and dynamically display Grafana dashboards for deployed EKS clusters (utilizing Prometheus data scraping and generated Grafana dashboards) using the Grafana API.
- Option to choose between cloud hosted services and local services, giving Chronos the ability to monitor instances and clusters on AWS' EC2, ECS, and EKS platforms.
- An updated AWS Graphs Container to dynamically render plots for EC2 or ECS data fetched with Electron using event listeners connecting to AWS CloudWatch w/ the aws-sdk package, as well as utilizing Prometheus data scraping and Grafana integration to fetch and render EKS data.
- Step-by-step instructions on setting up a new, functional EC2 instances, ECS clusters, and EKS clusters, ready to be monitored and tested by the app.

## Features

- Cloud-Based Instances:
    - Option to choose between cloud hosted services and local services, giving Chronos the ability to monitor instances and clusters on AWS EC2, ECS, and EKS platforms <img src="assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="20" /></a>
- Local instances utilitizing `@chronosmicro/tracker` NPM package:
    - Enables distributed tracing enabled across microservices applications
    - Displays real-time temperature, speed, latency, and memory statistics for local services
    - Displays and compares multiple microservice metrics in a single graph
    - Allow Kubernetes monitoring via Prometheus server
    - Compatible with <img src="assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="20" /></a>
    - Monitor an <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter
    - Supports <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases


# Installation

This is for the latest Chronos **version 11.0 release**.

## NPM Package

In order to use Chronos within your own application, you must have the `@chronosmicro/tracker` dependency installed.

The `@chronosmicro/tracker` package tracks your application's calls and scrapes metrics from your system.

- **NOTE:** The Chronos tracker code is included in the _chronos_npm_package_ folder for ease of development, but the published NPM package can be downloaded by running `npm install @chronosmicro/tracker`.

For more details on the NPM package and instructions for how to use it, please view the [Chronos NPM Package README](./chronos_npm_package/README.md).

#

<!-- ### Node Version -->
<!-- v11 notes: Our team also had no issues - we ran Node 18.-->
<!-- v10 notes: Our team never reverted to version 16.17.1 and had no issues running Node 18 and Electron 22 together. Commenting this out for future iteration teams' reference. -->
<!-- Make sure you're running version 16.17.1 of <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" />, to align with the <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /> version used by <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /> version 22. -->
<!-- <br> -->

## Chronos Desktop Application
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

### Creating User Database

**NOTE: You must create a user database **

1. Create a MongoDB database in which to store user information and insert it on line 2 within the [UserModel.ts](./electron/models/UserModel.ts) (_electron/models/UserModel.ts_) file.
    - This database will privately store user information.
3. Once this is set up, you can create new users, log in, and have your data persist between sessions.
#
### Running the Chronos desktop app in development mode

1. From the root directory, run `npm install`
2. Run `npm run build`
3. Open a new terminal and run `npm run dev:app` to start the Webpack development server
4. Open a new terminal and run `npm run dev:electron` to start the Electron UI in development mode
#
### Packing the Chronos desktop app into an executable

1. From the root directory, run `npm run build`
2. Run `npm run package`
3. Find the `chronos.app` executable inside the newly created `release-builds` folder in the root directory.

#
# Examples

We provide eight example applications for you to test out both the Chronos NPM package and the Chronos desktop application:

- AWS
    - [EC2 README](./examples/AWS/AWS-EC2/README.md)
    - [ECS README](./examples/AWS/AWS-ECS/README.md)
    - [EKS README](./examples/AWS/AWS-EKS/README.md)
- Docker
    - [Docker README](./examples/docker/README.md)
- gRPC
    - [gRPC README](./examples/gRPC/README.md)
- Kubernetes
    - [Kubernetes README](./examples/kubernetes/README.md)
- Microservices
    - [Microservices README](./examples/microservices/README.md)

Additional documentation on how Chronos is used **in each example** can be found in the [Chronos NPM Package README](./chronos_npm_package/README.md).

#### _AWS_

The `AWS` folder includes 3 example applications with instructions on how to deploy them in AWS platforms. Note that using AWS services may cause charges.

- The ECS folder includes an web application ready to be containerized using Docker. The instruction shows how to deploy application to ECS using Docker CLI command, and it will be managed by Fargate services.
- The EC2 folder includes a React/Redux/SQL web application ready to be containerized using Docker. The instruction shows how to deploy application using AWS Beanstalk and connect application to RDS database. Beanstalk service will generate EC2 instance.
- The EKS folder includes a containerized note taking app that uses a Mongo database as its persistent volume.  The instructions show how to deploy this application on EKS, how to monitor with Prometheus & Opencost, and how to use Grafana to grab visualizations. 

Refer to the [EC2 README](./examples/AWS/AWS-EC2/README.md), [ECS README](./examples/AWS/AWS-ECS/README.md), and [EKS README](./examples/AWS/AWS-EKS/README.md) example in the _AWS_ folder for more details.

#
#### _Docker_

In the <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> folder within the `master` branch, we provide a sample _dockerized_ microservices application to test out Chronos and to apply distributed tracing across different containers for your testing convenience.

The `docker` folder includes individual <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> files in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together.

Refer to the [Docker README](./examples/docker/README.md) in the `docker` folder for more details.
#


#### _gRPC_

The `gRPC` folder includes an HTML frontend and an Express server backend, as well as proto files necessary to build package definitions and make gRPC calls. The _reverse_proxy_ folder contains the server that requires in the clients, which contain methods and services defined by proto files.

Refer to the [gRPC README](./examples/gRPC/README.md) in the `gRPC` folder for more details.
#

#### _Kubernetes_

The `kubernetes` folder includes a React frontend and an Express server backend, and the Dockerfiles needed to containerize them for Kubernetes deployment. The _launch_ folder includes the YAML files needed to configure the deployments, services, and configurations of the frontend, backend, and Prometheus server.

Refer to the [Kubernetes README](./examples/kubernetes/README.md) in the `kubernetes` folder for more details.

#

#### _Microservices_

In the `microservices` folder, we provide a sample microservice application that successfully utilizes Chronos to apply all the powerful, built-in features of our monitoring tool. You can then visualize the data with the <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> app.

Refer to the [microservices README](./examples/microservices/README.md) in the `microservices` folder for more details.
#

# Testing

We've created testing suites for Chronos with React Testing and Jest - instructions on running them can be found in the [testing README](./__tests__/README.md).
#
## Contributing

Development of Chronos is open source on GitHub through the tech accelerator OS Labs, and we are grateful to the community for contributing bug fixes and improvements. 

Read our [contributing README](../../CONTRIBUTING.md) to learn how you can take part in improving Chronos.

### **Last Iterating Team**

#### Chronos 11.0
- [Lucie Seidler](https://github.com/LucieSeidler)
- [Jeffrey Na](https://github.com/jeffreyNa)
- [Brisa Zhu](https://github.com/beezoo10)
- [Kelsi Webb](https://github.com/kelsicw)
- [Justin Poirier](https://github.com/jcpoirier20)


#### Past [Contributors](contributors.md)
#
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


## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)
#

###### Return to [Top](#chronos)
