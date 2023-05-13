let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.propagate();

chronos.track()


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));

  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb:27017?authMode=scram-sha1";

let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" with docker. "my-db" with docker-compose
let databaseName = "my-db";

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  try {
    const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);
    let db = client.db(databaseName);
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    await db.collection("users").updateOne(myquery, newvalues, {upsert: true});

    client.close();

    // Send response
    res.send(userObj);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/get-profile', async function (req, res) {
  try {
    // Connect to the db
    const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);
    const db = client.db(databaseName);

    const myquery = { userid: 1 };

    const result = await db.collection("users").findOne(myquery);
    const response = result || {};

    client.close();

    // Send response
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
