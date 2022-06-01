/*
require kafkajs, producer, consumer

Connect to our kafka broker

Create 5 producers (call a method on the producer object)
Start them producing

Create 3 consumers (calls a method on the consumer object, to being consuming
messages from kafka broker)
Start them consuming
*/

const { Kafka } = require('kafkajs');
const { Consumer } = require('./consumer');
const { Producer } = require('./producer');

const kafka = new Kafka({
  brokers: [ process.env.KAFKA ],
})



const producers = []
for(let i = 0; i < 5; i++) {
  const newProd = new Producer(kafka, i)
  producers.push(newProd);
  newProd.start();
}
//id of all the producers we want to suscribe to
const subscriptions = [
  [1, 3, 5],
  [2, 4],
  [1, 3, 4]
];
//array where we put all of our consumers objects, if we need to reference them later
const consumers = [];

for(topics of subscriptions){
  const newConsumer = new Consumer(kafka, topics);
  consumers.push(newConsumer);
  newConsumer.start();
}
