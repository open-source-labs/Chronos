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

Chronos is a comprehensive developer tool that monitors the health and web traffic of servers, microservices, containers, and now, Amazon Web Services (AWS). Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

#

## What's New?

- Chronos is now able to work out of the box, addressing previous bugs that prevented Chronos to work as intended. File structure, dependencies, and webpack entry point have been updated, allowing Chronos Electron desktop application to run on multiple platforms. 
- User's account information and services can now be stored and saved in MongoDB User database. 
- Bug fixes and UI tweaks — Chronos is now a faster and more seamless experience than ever.
- Updated step-by-step instructions to learn how to deploy local services such as dockerized containers, microservices, and gRPC examples, as well as monitor them using the chronosmicro/tracker npm package. 
- Steamlined approach to access and dynamically displayed grafana dashboards for deployed EKS cluster (utilizing Prometheus data scraping and generated grafana dashboards) using the Grafana API. 

Previously implemented updates:
- Option to choose between cloud hosted services and local services, now giving Chronos the ability to monitor instances and clusters on AWS' EC2, ECS, and EKS platforms.
- An updated AWS Graphs Container to dynamically render plots for EC2 or ECS data fetched with Electron using event listeners connecting to AWS CloudWatch w/ the aws-sdk package, as well as utilizing Prometheus data scraping and Grafana integration to fetch and render EKS data.
- A step-by-step instruction on setting up a new, functional EC2 instance, ECS cluster, and EKS cluster, ready to be monitored and tested by the app.

## Features

- Cloud-Based Instances:
    - Option to choose between cloud hosted services and local services, now giving Chronos the ability to monitor instances and clusters on AWS' EC2, ECS, and EKS platforms <img src="assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="20" /></a>
- Local Instances utilitizing @chronosmicro/tracker NPM package:
    - Distributed tracing enabled across microservices applications
    - Displays real-time temperature, speed, latency, and memory statistics for local services
    - Display and compare multiple microservice metrics in a single graph
    - Kubernetes monitoring via Prometheus server
    - Compatible with <img src="assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="20" /></a>
    - Monitor an <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter
    - Supports <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases

#

## Installation

This is for the latest Chronos **version 10 release**.

**NOTE:** The Chronos tracker code is included in the _chronos_npm_package_ folder for ease of development, but the published npm package can be downloaded by running `npm install @chronosmicro/tracker`

<br>

<!-- ### Node Version -->
<!-- v10 notes: Our team never reverted to version 16.17.1 and had no issues running Node 18 and Electron 22 together. Commenting this out for future iteration teams' reference. -->
<!-- Make sure you're running version 16.17.1 of <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" />, to align with the <img src="assets/node-logo-color.png" alt="Node" title="Node" align="center" height="20" /> version used by <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /> version 22. -->
<!-- <br> -->

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
2. Run 'npm run build'
3. Open a new terminal and run `npm run dev:app` to start the Webpack development server
4. Open a new terminal and run `npm run dev:electron` to start the Electron UI in development mode

### Packing the Chronos App into an Executable

1. From the root directory, run `npm run build`
2. Run `npm package`
3. Find the `chronos.app` executable inside the newly created `release-builds` folder in the root directory.

#

## Chronos Tracker Microservice Examples

We provide three working example microservice applications branch for you to test out Chronos:

- _examples/microservices_
- _examples/docker_
- _examples/kubernetes_

#### _Microservices_

In the `microservices` folder, we provide a sample microservice application that successfully utilizes Chronos to apply all the powerful, built-in features of our monitoring tool. You can then visualize the data with the <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> app.

Refer to the [README](link) in the `microservices` folder for more details.

#### _Docker_

In the <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> folder within the `master` branch, we provide a sample _dockerized_ microservices application to test out Chronos and to apply distributed tracing across different containers for your testing convenience.

The `docker` folder includes individual <a href="#"><img src="assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="20" /></a> files in their respective directories. A docker-compose.yml is in the root directory in case you'd like to deploy all services together.

Refer to the [README](link) in the `docker` folder for more details.

<br>

#### _Kubernetes_

The `kubernetes` folder includes a React frontend and an Express server backend, and the Dockerfiles needed to containerize them for Kubernetes deployment. The _launch_ folder includes the YAML files needed to configure the deployments, services, and configurations of the frontend, backend, and Prometheus server.

Refer to the [README](link) in the `kubernetes` folder for more details.

<br>

#### _AWS_

The `AWS` folder includes 3 example applications with instructions on how to deploy them in AWS platforms. Note that using AWS services may cause charges.

- The ECS folder includes an web application ready to be containerized using Docker. The instruction shows how to deploy application to ECS using Docker CLI command, and it will be managed by Fargate services.
- The EC2 folder includes a React/Redux/SQL web application ready to be containerized using Docker. The instruction shows how to deploy application using AWS Beanstalk and connect application to RDS database. Beanstalk service will generate EC2 instance.
- The EKS folder includes a containerized note taking app that uses a Mongo database as its persistent volume.  The instructions show how to deploy this application on EKS, how to monitor with Prometheus & Opencost, and how to use Grafana to grab visualizations. 

Refer to the ECS [README](https://github.com/oslabs-beta/Chronos/blob/dev/examples/AWS/AWS-ECS/README.md), EC2 [README](https://github.com/oslabs-beta/Chronos/blob/dev/examples/AWS/AWS-EC2/README.md), and EKS [README](https://github.com/open-source-labs/Chronos/blob/master/examples/AWS/AWS-EKS/README.md) example in the `AWS` folder for more details.

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
