# Chronos
<hr />
Chronos consists of an NPM package to be required into a user’s microservices that intercepts all http and gRPC microservice communications, as well as monitors the health of each microservice over time. This information is written to a user-owned database (PostgreSQL or NoSQL) where it is queried and rendered by the frontend utilizing Node in conjunction with a native, cross-platform Electron desktop application with React components to ensure agreement between the frontend and database.

## Why was Chronos created?
<hr />
As companies grow larger and begin to scale, they have a tendency to move from a monolithic code architecture and microservices and distributed systems architecture in order to build faster, more maintainable code.

The process of modularizing a code bases and breaking a monolith into individual services can be a daunting task. How do you break apart and re-connect these services? There is often a transitional period where valuable time is spent debugging these connections between services.

Chronos is deigned to meet the needs of companies and developers working to break down their monoliths into distributed systems by combining an NPM package together with an Electron application to monitor and assist in the debugging of their services.

## How to Install Chronos
<hr />
The Chronos-Microservice-Debugger Express Middleware can be found on npm: https://www.npmjs.com/package/chronos-microservice-debugger

To install NPM package:
```javascript
npm install chronos-microservice-debugger
```

The Chronos Electron application is in progress and will soon be availble for public download for all platforms. Please stay tuned.

## How to Use Chronos
<hr />
There are two main aspects to Chronos-Microservice-Debugger
1. Communication Monitor: Listens in on all microservice-microservice and microservice-client communication and monitors the response statuses and messages to ensure communications are making it to the correct destination successfully.
2. Health Monitor: The health monitor checks the status of your microservice every second and sends this health information to an optional electron frontend where it is visualized for easier use.

To use the npm package, there are three required parameters and an optional fourth parameter. You can enter the items as individual strings or as an array containing the three required parameters and one optional parameter.

The parameters are:
1. microserviceName: What do you want to name the current microservice
2. databaseType: We currently support PostgreSQL and Mongo. Enter "mongo" or "sql"
3. databaseURL: Where would you like to store your information? Enter the URL to your database
4. queryFrequency: How often do you want microHealth to monitor the health of your database? It defaults to every second, but you can choose:
..1. "s" : The default, monitors every second
..2. "m" : Monitors every minute
..3. "h" : Monitors every hour
..4. "d" : Monitors once per day
..5. "w" : Monitors once per week

String parameter example:
```javascript
// How to use chronos-microservice-debugger
app.use('/', chronos-microservice-debgugger.microCom('microserviceName', 'databaseType', 'databaseURL'))

chronos-microservice-debugger.microHealth('microserviceName', 'databaseType', 'databaseURL', 'queryFrequency'))

// Example using string parameters
app.use('/', chronos-microservice-debugger.microCom('books', 'sql', 'thisIsMyURL'))
// Note: microCom does not utilize queryFreq because it logs all communication when an endpoint is hit

chronos-microservice-debugger.microHealth('books', 'sql', 'thisIsMyURL', 'h')
```

Array parameter example:
```javascript
let values = [
  'microserviceName',
  'databaseType',
  'databaseURL',
  'queryFrequency'
]
// How to use chronos-micrservice-debugger with an array parameter
app.use('/', chronos-microservice-debgugger.microCom(values)

chronos-microservice-debugger.microHealth(values)

// Example using an array parameter
let values = [
  'books',
  'mongo',
  'thisIsMyNewURL',
  'w'
]

app.use('/', chronos-microservice-debgugger.microCom(values)
// Note: microCom does not utilize queryFreq because it logs all communication when an endpoint is hit

chronos-microservice-debugger.microHealth(values)

```

## How to Contribute to Chronos
<hr />
Chronos hopes to inspire an active community of both users and developers. For questions, comments, suggestions, please contact us at teammicronos@gmail.com or submit a pull request.

## Created By
* Duane McFarlane
* Michelle Herrera
* Mohtasim Chowdhury
* Natalie Umanzor
