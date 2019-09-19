const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());

//Required to get rid of deprecation warnings
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

  module.exports = function(currentMicroservice) {
    return function (req,res,next) {
      mongoose.connect(
        "mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access",
        () => {
          console.log("Chronos database is connected...");
        }
      )
      const currentMicroservicePath = currentMicroservice;

      require('./HealthInfo.js')
      const HealthInfo = mongoose.model("HealthInfo")

        const newHealthPoint = {
          currentMicroservice: currentMicroservicePath,
          targetedEndpoint: req.originalUrl,
          reqType: req.method,
          timeSent: Date.now()
        };

        const healthPoint = new HealthInfo(newHealthPoint);

        healthPoint.save().then(()=> {
          console.log('New Health Point Created')
        }).catch((err) => {
          if (err) {
            throw err;
          }
        })
        next();
    }
  }
