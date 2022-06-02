/*
require kafkajs, producer, consumer

Connect to our kafka broker

Create 5 producers (call a method on the producer object)

Use kafka admin to create topics for each producer

Start the producers producing

Create 3 consumers (calls a method on the consumer object, to being consuming
messages from kafka broker)

start the consumers consuming

*/
require('dotenv').config();
const { Kafka } = require('kafkajs');
const { Consumer } = require('./consumer');
const { Producer } = require('./producer');

const brokerAddress= process.env.KAFKA + ':9092'

const kafka = new Kafka({
  brokers: [ brokerAddress ],
})

const admin = kafka.admin();

const topicOptions = (topics) => 

function topicOptions(topics) {
  return {
  validateOnly: false,
  waitForLeaders: false,
  timeout: 5000,
  topics
}
}

console.log('Kafka instance at: ', brokerAddress);

//Create an array of producers
const producers = []
for(let i = 1; i < 6; i++) {
  const newProd = new Producer(kafka, i)
  producers.push(newProd);
}

//id of all the producers we want to suscribe to
const subscriptions = [
  [1, 3, 5],
  [2, 4],
  [1, 3, 4]
];
//array where we put all of our consumers objects, if we need to reference them later
const consumers = [];

//Create topics in our Kafka broker for each producer if they don't exist
admin.connect()
  .then(() => 
    admin.listTopics()
  )
  .then( (topics) => {
    //console.log('CURRENT TOPICS: ', topics);
    const newTopics = [];
    for(const p of producers){
      if(!topics.includes(p.topic)){
        console.log(p.topic);
        newTopics.push({topic: p.topic});
      }
    }
    //console.log('NEW TOPICS ', newTopics)
    return newTopics;
  })
  .then( (newTopics) => {
    //console.log('NEW TOPICS ', newTopics);
    if(newTopics.length > 0) admin.createTopics(topicOptions(newTopics))
  })
  .then(() => {
    for(const p of producers){
      p.start();
    }
  })
  .then(() => {
    for(topics of subscriptions){
      const newConsumer = new Consumer(kafka, topics);
      consumers.push(newConsumer);
      newConsumer.start();
    }
  })
  .catch(err => console.log(err))
