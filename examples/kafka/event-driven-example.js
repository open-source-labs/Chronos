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

const subscriptions = [
  [1, 3, 5],
  [2, 4],
  [1, 3, 4]
];
const consumers = [];

for(topics in subscriptions){
  const newConsumer = new Consumer(kafka, topics);
  consumers.push(newConsumer);
  newConsumer.start();
}
