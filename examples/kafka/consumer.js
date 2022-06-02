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
    console.log(`Consumer for ${this.producers} is connected`)
    for(const topic of this.producers){
      await this.consumer.subscribe({ topic: `Producer-${topic}`, fromBeginning: true });
      console.log(`Subscribed to producer ${topic}`)
    }
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        console.log({
          key: message.key.toString(),
          value: message.value.toString(),
          timestamp: message.timestamp.toString(),
          headers: message.headers,
        })
      },
    })
    console.log(`Consumer for ${this.producers} is now consuming.`)
  }
  //   const runParameter = {
  //     eachMessage:  ({ topic, partition, message }) => {
  //         // console.log({
  //         //     key: message.key.toString(),
  //         //     value: message.value.toString(),
  //         //     timestamp: message.timestamp.toString(),
  //         //     headers: message.headers,
  //         // })
  //         console.log("HELLO");
  //       },
  //     }
  //   console.log(`starting consumer for ${this.producers}`);
  //   this.consumer.connect()
  //    .then(() => {
  //      console.log('starting subscriptions');
  //      const subPromises = [];
  //      for(const topic in this.producers){
  //        subPromises.push(this.consumer.subscribe({ topic, fromBeginning: true }))
  //      };
  //      console.log('SUBSCRIPTION PROMISES: ', subPromises);
  //      return subPromises;
  //    })
  //    .then((array) => {
  //      console.log('Promise all...');
  //      Promise.all(array)
  //       .then(() => 
  //         this.consumer.run(runParameter)
  //           .then((something) => console.log('what is something?', runParameter))
  //       )
  //       .then((secret) => {
  //         console.log('HERE IS THE SECRET:', secret);
  //         console.log(`Running consumer for ${this.producers}`);
  //       })
  //       .catch(err => console.log(err));
  //    })
  //    .catch(err => console.log(err));
  // }
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