/* 
create consumer class

Constructor:


*/



class Consumer {
  constructor(kafka, producers) {
    this.consumer = kafka.consumer({ groupId: 'my-group' });
    this.producers = producers;
    
  }

 async start() {
    await this.consumer.connect();
    for(const topic in this.producers){
      await consumer.subscribe({ topic, fromBeginning: true });
    }
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
          console.log({
              key: message.key.toString(),
              value: message.value.toString(),
              timestamp: message.timestamp.toString(),
              headers: message.headers,
          })
        },
      })
  }
};

module.exports.Consumer = Consumer;