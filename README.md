##Chronos Microservice Debugger
Chronos Microservice Debugger consists of an npm package with an optional Electron front end to visualize and monitor your microservices.

## Install
```javascript
npm install chronos-microservice-debugger
```

## Usage
There are two main aspects to Chronos-Microservice-Debugger
*Communication Monitor: Listens in on all microservice-microservice and microservice-client communication and monitors the response statuses and messages to ensure communications are making it to the correct destination successfully.
*Health Monitor: The health monitor checks the status of your microservice every second and sends this health information to an optional electron frontend where it is visualized for easier use.


```javascript
app.use('/', chronos-microservice-debugger.microCom('microserviceName', 'databaseType', 'databaseURL'))
chronos-microservice-debugger.microHealth('microserviceName', databaseType, databaseURL))
```
Chronos uses a user-owned and provided database to ensure that your private data stays private. We currently support MongoDB and SQL/PostgreSQL databases.

## Things in the Works
*gRPC support
*Ability to determine how often your microservice health is monitored (currently every second)
*'Time Travel' to see how your microservices have changed over time
*Docker health information for containerized microservices
*Implement additional unit testing

## Links
*Chronos Website: http://chronos.ninja
*Gitub Page: https://github.com/oslabs-beta/Chronos

## Contact Us
For questions, requests, or more information, please contact us at teammicronos@gmail.com

