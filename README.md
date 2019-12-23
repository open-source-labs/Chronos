## Chronos Microservice Debugger
Chronos Microservice Debugger consists of an npm package with an optional Electron front end to visualize information collected through use of npm package.

## Install
```javascript
npm install chronos-microservice-debugger2
```

## Usage
There are two main aspects to Chronos-Microservice-Debugger
1. Communication Monitor: Listens in on all microservice-microservice and microservice-client communication and monitors the response statuses and messages to ensure communications are making it to the correct destination successfully.
2. Health Monitor: The health monitor checks the status of your microservice every second and sends this health information to an optional electron frontend where it is visualized for easier use.

To use the npm package, there are four required parameters and an optional fifth parameter. You can enter the items as individual strings or as an array containing the three required parameters and one optional parameter.

The parameters are:
1. microserviceName: What do you want to name the current microservice
2. databaseType: We currently support PostgreSQL and Mongo. Enter "mongo" or "sql"
3. databaseURL: Where would you like to store your information? Enter the URL to your database
4. wantMicroHealth: Do you want the microHealth of your microservice to be monitor? Enter "yes" or "no"
5. queryFrequency: How often do you want microHealth to monitor the health of your database? It defaults to every minute, but you can choose:
  * "s" : Monitors every second
  * "m" : The default, monitors every minute
  * "h" : Monitors every hour
  * "d" : Monitors once per day
  * "w" : Monitors once per week

String parameter example:
```javascript
// How to use chronos-microservice-debugger2
// Place the following two lines before requiring express
const cmd = require('chronos-microservice-debgugger2');
cmd.propagate();

// Place the following line of code before the microservice re-routes the request (for string parameters)
app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL','wantMicroHealth','queryFrequency'))

// Or place the following line of code before the microservice re-routes the request (for array parameter)
app.use('/', cmd.microCom(['microserviceName', 'databaseType', 'databaseURL','wantMicroHealth','queryFrequency']))

// Example using string parameters
app.use('/', cmd.microCom('books', 'sql', 'thisIsMyURL','yes', 'm'))

```

Array parameter example:
```javascript
let values = [
  'microserviceName',
  'databaseType',
  'databaseURL',
  'wantMicroHealth',
  'queryFrequency'
]
// How to use chronos-micrservice-debugger2 with an array parameter
app.use('/', cmd.microCom(values)

// Example using an array parameter
let values = [
  'books',
  'mongo',
  'thisIsMyNewURL',
  'yes',
  'w'
]

app.use('/', cmd.microCom(values)

```

Chronos uses a user-owned and provided database to ensure that your private data stays private. We currently support MongoDB and SQL/PostgreSQL databases.

## Things in the Works
1. gRPC support
3. 'Time Travel' to see how your microservices have changed over time
4. Docker health information for containerized microservices
5. Implement additional unit testing
6. Published Electron application with cross-browser compatibility
7. Microservice Architecture Visualizer

## Links
1. Gitub Page: https://github.com/Chronos2-0/Chronos

## Contact Us
For questions, requests, or more information, please contact us at chronosjobtc@gmail.com

