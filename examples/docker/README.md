# Chronos Dockerized Microservices Example

This sample microservices architecture allows developers to explore the functionality of Chronos but with one docker compose command. This consists of four microservices, which are contained within the directories:

- Auth
- Items
- Inventory
- Orders
- Event-Bus
- Client

Each microservice has its own server, which receives requests from both the `Client` and from other microservices by using `Event-bus`.

- _Auth_, _Items_, _Inventory_, and _Orders_ also have their own databases, which they can query to respond to those requests.

The `Client` is set up to send requests to the appropriate service (individual application) in the microservice network.

In development they're all run separately on different ports, with said ports listening out for requests. This is for demonstration and testing purposes.

Ideally, in a production environment, all the services will be up and running concurrently from the get go and that's what the `docker-compose.yml` file helps us achieve. It is able to chain all the services and run them together with one command.

Docker also ensures that the versions that worked well on dev are bundled up and distributed and used to run the containers for the individual containers.

## Additional Documentation

For additional details on how Chronos works this example, please review the Docker section in the [Chronos NPM Package README](../../chronos_npm_package/README.md).

## Grafana API KEY

1. To initiate your Grafana container and prepare for accessing your service account token, execute the following command: `docker-compose -f docker-compose.yml up`

2. In your browser, go to `localhost:32000`, which will be the login page of Grafana. Use `admin` as both username and password to login. You can change the password after login.

3. Navigate to `Home -> Administration -> Service accounts`, then click `Add service account` to create a service account. Be sure to choose `Admin` as the role. Then click `Add service account token`, hit `generate`, you are done! Remember this token, you will be using this token to access Grafana HTTP API programmatically, which is defined in `chronos-config.ts` file in each microservices application.

4. Stop all containers and delete all images (except Grafana).

## Steps to Run Example

Peform the following steps in each of the _Auth_, _Items_, _Inventory_, _Orders_, _Client_, and _Event-Bus_ directories

1. Add a `.env` file to each of _Auth_, _Items_, _Inventory_, _Orders_, _Event-Bus_, and _Client_ folders with the following key/value pairs (a `.env.example` file is provided in the `/examples/docker` directory):

- **NOTE**: Ensure that there are no quotes surrounding any of the keys and values.

```
CHRONOS_DB = MongoDB or PostgreSQL
CHRONOS_URI = The URI to the desired MongoDB or PostgreSQL database to save health metrics via Chronos
CHRONOS_GRAFANA_API_KEY = Bearer [the access token you created in above section (Grafana API Key)]

MONGO_URI_AUTH = A MongoDB URI for the auth server microservice to use
MONGO_URI_ITEMS = A MongoDB URI for the items server microservice to use
MONGO_URI_INVENTORY = A MongoDB URI for the inventory server microservice to use
MONGO_URI_ORDERS = A MongoDB URI for the orders server microservice to use

JWT_KEY = A random string used to sign and verify JSON Web Tokens used by the auth service - the random string provided in **sample.env** will work
JWT_LIFETIME = The time-to-expiration of the JSON Web Token used by the auth service - this is set to `1d` in `sample.env` meaning user authentication is valid for 1 day
```

2.  Verify that `@chronosmicro/tracker` is a dependency in each of the _Auth_, _Items_, _Inventory_, _Orders_, and _Event-Bus_ folders (see the `package.json` in each folder).

    - If the @chronosmicro/tracker dependency is listed as a **remote** npm package (i.e. `"@chronosmicro/tracker": "^12.0.1"`) and you've ran `npm install`, no further work is needed continue to step 3. **However, confirm that the "@chronosmicro/tracker" you've installed from npm has the correct information which you will query later because the database automation will build from the npm installed version NOT the root directory level "chronos_npm_package"**

    - If you have the dependency as `"@chronosmicro/tracker": "file:./chronos_npm_package"`, which is a **local** file, make sure to change the version from `"file:./chronos_npm_package"` to `"^12.0.1"` and run npm install. **Unless you are wanting to test local copies of the "Chronos_npm_package" file**

3.  With the terminal navigated to the _examples/docker_ folder, run the command:

```
docker-compose -f docker-compose.yml up
```

4. If you run into any issues regarding `linux/amd64/v8,linux/arm/v7,linux/arm64/v8` for cadvisor, navigate to the docker-compose.yml and find the cadvisor dictionary and try the below solutions.
1. Change `platform` to `linux/arm64/v8` for M1 Chips and `linux/amd64/v8` for Intel Chips.
1. Change "image" to `image: gcr.io/cadvisor/cadvisor:latest` to `image: gcr.io/cadvisor/cadvisor:v0.47.0`
1. Alternatively, use Docker Buildx to specify multi-platform.

###

You should now see the containers running in your terminal, each reporting `"docker metrics recorded in..."`.

<p align="center">
  <img alt="docker data being recorded" src="../../assets/docker_example_logs.png" width="450">
</p>

If this is being displayed for the `Auth`, `Items`, `Inventory`, `Orders` microservices then the example is successfully saving health metrics to your database of choice!

If there is any error when running the applications and the underlying files for a microservice were changed, be sure to delete the previous image before calling `docker-compose -f docker-compose.yml up` again.

- If you do not, the above docker compose command will not know to rebuild the image and the code changes meant to fix any issues will not be rolled into the existing Docker image!

Your microservice health metrics can now be viewed at the given `CHRONOS_URI` or, preferrably, in the Electron.js desktop application. You can go to `http://localhost:5001/` to log into `Client` to create item, inventory, orders and these requests will be tracked by Chronos.

## To stop and remove containers

To stop containers, use `^C`.

<p align="center">
  <img alt="docker containers stopped" src="../../assets/examples_docker_stop.png">
</p>

Use `docker compose down` to remove.

<p align="center">
  <img alt="docker containers removed" src="../../assets/examples_docker_removed.png">
</p>

## Insight for how to migrate this example to your own app

To configure Prometheus and Grafana, you can simply copy the below yaml files to your own app.

```
prometheus.yml
datasource.yml
dashboard.yml
10619_rev1.json
**(Please note dashboard.yml and 10619_rev1.json is just one of many dashboards available on https://grafana.com/grafana/dashboards/)**
```

Then configure Prometheus and Grafana with your own application's deployments using images.

## License

[MIT](https://github.com/oslabs-beta/Chronos/blob/master/LICENSE.md)

...
