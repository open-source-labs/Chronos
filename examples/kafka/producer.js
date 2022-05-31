/*
Require kafkajs

create producer class
  kafka instance
  id number

Methods:

constructor:
  connnect immediately to the kafka broker w/ producer.connect

start
  start sending messages to kafka broker with producer.send() on an interval defined by it's id (in seconds)



*/

const { Kafka } = require('kafkajs');

class Producer {
  constructor() {
        
  }
  start(){

  } 
};