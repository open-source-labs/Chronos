<a href="https://chronoslany.com/">
    <img src="assets/animated_logo.gif" alt="Chronos" title="Chronos" align="center" height="500" />
</a>

![Build Passing](https://img.shields.io/badge/build-awesome-brightgreen)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/open-source-labs/Chronos)
![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![Release: 12.0](https://img.shields.io/badge/Release-12.0-brightgreen)

# Chronos

### ⭐️ Star us on GitHub! ⭐️

**Visit our website at [chronoslany.com](https://chronoslany.com/).**

Chronos is a comprehensive developer tool that monitors the health and web traffic for containerized (Docker & Kubernetes) and non-containerized microservices communicated via REST APIs or gRPC, whether hosted locally or on Amazon Web Services (AWS). Use Chronos to see real-time data monitoring and receive automated notifications over Slack or email.

## What's New?

- Updated microservices example with

### With Chronos 13.0

<a href="https://chronoslany.com/">
    <img src="assets/demo.gif" alt="Chronos" title="Chronos" align="center" height="500" width="auto" />
</a>

<br>

**Previously implemented updates:**

- Enhanced metrics visualization by integrating more interactive and adaptable Grafana charts for Docker and Kubernetes use cases.
- Achieved an 80% boost in test coverage by formulating comprehensive unit, integration, and end-to-end tests employing Jest and Selenium.
- Streamlined operational effectiveness by coordinating CI/CD pipelines, automating testing workflows, and establishing deployment protocols, ultimately leading to accelerated development cycles and heightened dependability.
- Updated the Docker and Kubernetes example READMEs with detailed instructions on configuring Prometheus and Grafana seamlessly.

## Overview of the CodeBase

- Instead of the typical folders & files view, a visual representation of the code is created. Below, it's showing the same repository, but instead of a directory structure, each file and folder as a circle: the circle’s color is the type of file, and the circle’s size represents the size of the file. See live demo <a href='https://mango-dune-07a8b7110.1.azurestaticapps.net/?repo=oslabs-beta%2FChronos'>here</a>.
  <img src="assets/Codebase Visulization.png" alt="codebase visulization" align="center" height="500"/>

## Features

- Cloud-Based Instances:
  - Option to choose between cloud hosted services and local services, giving Chronos the ability to monitor instances and clusters on AWS EC2, ECS, and EKS platforms <img src="assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="20" /></a>
- Local instances utilitizing `@chronosmicro/tracker` NPM package:
  - Enables distributed tracing enabled across microservices applications
  - Displays real-time temperature, speed, latency, and memory statistics for local services
  - Displays and compares multiple microservice metrics in a single graph
  - Allow Kubernetes and Docker monitoring via Prometheus server and Grafana visualization.
  - Compatible with <img src="assets/graphql-logo-color.png" alt="GraphQL" title="GraphQL" align="center" height="20" /></a>
  - Monitor an <a href="#"><img src="assets/pngwing.com.png" alt="Apache Kafka" title="Apache Kafka" align="center" height="20" /></a> cluster via the JMX Prometheus Exporter
  - Supports <a href="#"><img src="assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" align="center" height="20" /></a> and <img src="assets/mongo-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="20" /></a> databases

# Installation

This is for the latest Chronos **version 12.0 release**.

## NPM Package

In order to use Chronos within your own application, you must have the `@chronosmicro/tracker` dependency installed.

The `@chronosmicro/tracker` package tracks your application's calls and scrapes metrics from your system.

- **NOTE:** The Chronos tracker code is included in the _chronos_npm_package_ folder for ease of development, but the published NPM package can be downloaded by running `npm install @chronosmicro/tracker`.

For more details on the NPM package and instructions for how to use it, please view the [Chronos NPM Package README](./chronos_npm_package/README.md).

#

<!-- ### Node Version -->
<!-- v12 notes: Our team also had no issues - we ran Node 18 and Electron 22-->
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

**NOTE: You must create your own user database**

1. Create a MongoDB database in which to store user information and insert it on line 2 within the [UserModel.ts](./electron/models/UserModel.ts) (_electron/models/UserModel.ts_) file.
   - This database will privately store user information.
2. Once this is set up, you can create new users, log in, and have your data persist between sessions.

#

### Running the Chronos desktop app in development mode

1. From the root directory, run `npm install`
2. Run `npm run build`
3. Depends on the environment, run `npm audit fix` or `npm audit fix --force` if prompted
4. Open a new terminal and run `npm run dev:app` to start the Webpack development server
5. Open a new terminal and run `npm run dev:electron` to start the Electron UI in development mode
   .

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
- The EKS folder includes a containerized note taking app that uses a Mongo database as its persistent volume. The instructions show how to deploy this application on EKS, how to monitor with Prometheus & Opencost, and how to use Grafana to grab visualizations.

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

The `kubernetes` folder includes a React frontend and an Express server backend, and the Dockerfiles needed to containerize them for Kubernetes deployment. The _launch_ folder includes the YAML files needed to configure the deployments, services, and configurations of the frontend, backend, Prometheus server, and Grafana.

Refer to the [Kubernetes README](./examples/kubernetes/README.md) in the `kubernetes` folder for more details.

#

#### _Microservices_

In the `microservices` folder, we provide a sample microservice application that successfully utilizes Chronos to apply all the powerful, built-in features of our monitoring tool. You can then visualize the data with the <img src="assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="20" /></a> app.

Refer to the [microservices README](./examples/microservices/README.md) in the `microservices` folder for more details.

#

# Testing

We've created testing suites for Chronos with React Testing, Jest, and Selenium for unit, integration, and end-to-end tests - instructions on running them can be found in the [testing README](./__tests__/README.md).

#

## Contributing

Development of Chronos is open source on GitHub through the tech accelerator OS Labs, and we are grateful to the community for contributing bug fixes and improvements.

Read our [contributing README](../../CONTRIBUTING.md) to learn how you can take part in improving Chronos.

### **Last Iterating Team**

#### Chronos 13.0

- [Elsa Holmgren](https://github.com/ekh88)
- [Mckenzie Morris](https://github.com/mckenzie-morris)
- [Kelly Chandler](https://github.com/kchandler44)
- [Sean Simson](https://github.com/seantokuzo)
- [Zhongyan Liang](https://github.com/ZhongyanLiang)

#### Past [Contributors](contributors.md)

#

## Technologies

![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTTP](https://img.shields.io/badge/HTTP-394EFF?style=for-the-badge)
![gRPC](https://img.shields.io/badge/gRPC-394EFF?style=for-the-badge)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![vis.js](https://img.shields.io/badge/vis.js-3578E5?style=for-the-badge)
![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)

#

###### Return to [Top](#chronos)
