![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)
## Microservices Architecture
Microservices architecture for testing [Chronos](https://github.com/open-source-labs/Chronos), a microservice communication and health visualizer.

## Purpose and Design
This sample microservices architecture allows developers to explore the functionality of Chronos with gRPC calls. It consists of 3 microservices, which are contained within the directories:
- Reverse Proxy
- Books
- Orders

Each microservice has its own server, which receives requests from both the client and from other microservices. Books, Customers, and Orders also have their own databases, which they can query to respond to those requests.

## Getting Started w/ gRPC Example Microservices 

Follow **'main'** branch READ>ME steps: Pre-Installation, Install Dependencies before start. 

On each microservice in example/microserivces, perform the following steps
  - *Do this for microservices: books, orders, & reverse proxy
  - Create a .env file under each microservice folder and input your own Mongodb Atlast URI for Microservice_URI, CHRONOS_URI and ORDER_URI, see example below:

```
BOOK_URI = mongodb+srv://<username>:<password>@cluster0.o2hx5.mongodb.net/<dbname>?retryWrites=true&w=majority

CHRONOS_URI = mongodb+srv://<username>:<password>@cluster0.o2hx5.mongodb.net/<dbname>?retryWrites=true&w=majority

ORDER_URI = mongodb+srv://<username>:<password>@cluster0.o2hx5.mongodb.net/<dbname>?retryWrites=true&w=majority
```
  - In each Microservices *chronos-config.js* file, verify that `"mode"` property has a value of `"microservices"`

```
  - **Note: The Initialize Chronos step is already taken care of for you. 
  - Inside each microservice directory, install all dependencies using the `npm install`
  - Run `npm run start` in each folder directory
  - Head over to localhost:3030 to view reverse proxy acting as the frontend of this microservice example
  - Start adding data!
  - Run `npm run both` to start Electron app
    - Add a new application in Chronos app dashboard.
    - The URI should be your CHRONOS_URI


**To test the functionality of Chronos using this sample microservices architecture, you must have the [Chronos node module](https://www.npmjs.com/package/chronos-microservice-debugger3) within each microservice. This is already included as a dependency therefore there should be no need to install it manually. But if it is missing from the dependency list, the installation instructions for both the Chronos node module and the Chronos desktop visualizer are below:**


#### Electron desktop application

After installing the node module in each microservice, download the Electron desktop application from the public [Chronos](https://github.com/oslabs-beta/Chronos) repo.

Inside the downloaded directory, install all dependencies using the `npm install` command followed by the `npm run both` command to start the Electron desktop application.

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People

[Vince Ho](https://github.com/hodesza)
[Matt Jiang](https://github.com/mattljiang)
[Derek Lam](https://github.com/DerekQuoc)
[Kit Loong Yee](https://github.com/kitloong1)
## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/chronos-microservice-debugger3.svg
[npm-url]: https://www.npmjs.com/package/chronos-microservice-debugger3
[downloads-image]: https://img.shields.io/npm/dm/chronos-microservice-debugger3.svg
[downloads-url]: https://npmjs.org/package/chronos-microservice-debugger3
