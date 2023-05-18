# Chronos Kubernetes Example

This example demonstrates how `Chronos` can be used to track health metrics of a Kubernetes cluster when deployed with a Prometheus monitoring server. The folders in this example include the following:
- *client*: A React application (in the *client* folder) that requests a random number from a Node/Express API
- *server*: The Node/Express API that responds with the random number. This is where the **Chronos** package is actually imported and executed.
- *launch*: YAML files describing the *deployment* and *service* configurations for the client, server, and Prometheus server
- *scripts*: Scripts to automate some of the steps involved in running the example

## Install Docker Desktop
This example has been developed and tested using the Kubernetes Engine packaged in the Docker Desktop application. Follow instructions online to download/install Docker Desktop and to enable the Kubernetes Engine.

## Build the Client
`cd` into the *client* folder and run the following command:
```
docker build -t frontend:1.0 .

```
**Mac Users:** Alternatively running the above command, `cd` into the scripts folder and run the `buildClient.sh` script

<br>

## Build the Server
First, add a `.env` file to the *server* folder that contains the following key/value pairs:

```
CHRONOS_DB = MongoDB or PostgreSQL
CHRONOS_URI = The URI to the desired MongoDB or PostgreSQL database to save health metrics via **Chronos**
```

Then look at the `package.json` file in the server folder and note how `@chronosmicro/tracker` is included as a dependency:

- If the @chronosmicro/tracker dependency is listed as a remote npm package (i.e. `"@chronosmicro/tracker": "^8.0.1"`), no further work is needed.

- If the @chronosmicro/tracker dependency is listed as a local npm package (i.e. `"@chronosmicro/tracker": "file:./chronos_npm_package"`), the Docker build will require that the the Chronos code is in this folder. Either copy the _chronos_npm_package_ folder in manually, or see note below to automate this process **if you are a Mac user**.

`cd` into the *server* folder and run the following command:
```
docker build -t backend:1.0 .
```

**Mac Users:** If @chronosmicro/tracker is included as a local npm package, the process of copying in the *chronos_npm_package* folder, performing the Docker build, and then removing the copied in folder is automated by `cd` into the *scripts* folder and running the `buildServer.sh` script.

<br>

## Deploy the Cluster
`cd` into the launch folder and run the following commands to start the services and deployments described in the YAML files:
```
kubectl apply -f clusterRole.yml
kubectl apply -f promConfig.yml
kubectl apply -f prometheus.yml
kubectl apply -f backend.yml
kubectl apply -f frontend.yml
```

**Mac Users:** Alternatively to running the above commands, `cd` into the *scripts* folder and run the `startKuber.sh` script


#
console.logs in your terminal should now indicate "kubernetesmetrics saved in *postgresql* or *mongodb* database"

Your microservice health metrics can now be viewed at the given `CHRONOS_URI` or, preferrably, in the Electron.js desktop application.
#


## Teardown the Cluster
`cd` into the launch folder and run the following commands to stop the running services and deployments:
```
kubectl delete -f clusterRole.yml
kubectl delete -f promConfig.yml
kubectl delete -f prometheus.yml
kubectl delete -f backend.yml
kubectl delete -f frontend.yml
```

**Mac Users:** Alternatively to running the above commands, `cd` into the *scripts* fodler and run the `stopKuber.sh` script

## Contributing
Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People
[Josh James](https://github.com/joshjames289)
[Elise Nie](https://github.com/elisanie)
[Gahl Peled](https://github.com/GP3-RS)
[Troy Prejusa](https://github.com/tprejusa)
[Vince Ho](https://github.com/hodesza)
[Matt Jiang](https://github.com/mattljiang)
[Derek Lam](https://github.com/DerekQuoc)
[Kit Loong Yee](https://github.com/kitloong1)
[Tim Atapagra](https://github.com/timpagra),
[Mohtasim Chowdhury](https://github.com/mohtasim317),
[Ousman Diallo](https://github.com/Dialloousman),
[Michelle Herrera](https://github.com/mesherrera),
[Duane McFarlane](https://github.com/Duane11003),
[Ben Mizel](https://github.com/ben-mizel),
[Jenae Pennie](https://github.com/jenaepen),
[Chris Romano](https://github.com/robicano22),
[Natalie Umanzor](https://github.com/nmczormick)
[John Donato](https://github.com/jdonuto)
[Iris Wong](https://github.com/wiris316)
[Jon Cruz](https://github.com/Jrcrz)
[Elena Atencio](https://github.com/elenaatencio)

## License
[MIT](LICENSE)
