/* 
create consumer class

Constructor:


*/



class Consumer {
  constructor(kafka, producers) {
    this.consumer = kafka.consumer({ groupId: 'my-group' });
    this.producers = producers;
    
  }

  start() {
    // await this.consumer.connect();
    // for(const topic in this.producers){
    //   await consumer.subscribe({ topic, fromBeginning: true });
    // }
    // await consumer.run({
    //   eachMessage: async ({ topic, partition, message, heartbeat }) => {
    //       console.log({
    //           key: message.key.toString(),
    //           value: message.value.toString(),
    //           timestamp: message.timestamp.toString(),
    //           headers: message.headers,
    //       })
    //     },
    //   })
    
    const runParameter = {
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
          console.log({
              key: message.key.toString(),
              value: message.value.toString(),
              timestamp: message.timestamp.toString(),
              headers: message.headers,
          })
        },
      }

    this.consumer.connect()
     .then(() => {
       const subPromises = [];
       for(const topic in this.producers){
         subPromises.push(this.consumer.subscribe({ topic, fromBeginning: true }))
       };
       return subPromises;
     })
     .then((array) => {
       Promise.all(array)
        .then(() => {
          consumer.run(runParameter);
        })
        .catch(err => console.log(err));
     })
     .catch(err => console.log(err));
  }
};



// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//    console.log('received message')
//    try {
//     await handler(JSON.parse(message.value.toString()))
//    } catch (e) {
//     console.error('unable to handle incoming message', e)
//    }
//   },
//  })



module.exports.Consumer = Consumer;