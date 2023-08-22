const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo = null;
let uri;
 
const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  uri = await mongo.getUri();
 
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((result) => {
    console.log(result.connection.readyState)
    console.log(result.connection.host)
  }).catch((err) => {
    console.log('Unable to connect to MongoMemoryServer')
  });
};

const dropDB = async () => {
    if (mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongo.stop();
    }
};

const dropCollections = async () => {
    if (mongo) {
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    }
  };


module.exports = { connectDB, dropDB, dropCollections, uri }