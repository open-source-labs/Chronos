/*

create producer class
  kafka instance
  id number

Methods:

constructor:
  connnect immediately to the kafka broker w/ producer.connect

start
  start sending messages to kafka broker with producer.send() on an interval defined by it's id (in seconds)



*/
class Producer {

  constructor(kafka, id){
    this.producer = kafka.producer();
    this.id = id;
    this.topic = `Producer-${id}`;
    this.count = 1;
    this.sendMessage = this.sendMessage.bind(this);
    console.log('TOPIC: ', this.topic)
  }

  createMessage() {
    return {
      key: this.id.toString(),
      value: `This is message ${this.count++} from producer #${this.id}`,
    };
  }

  sendMessage() {
    return this.producer
      .send({
        topic: this.topic,
        messages: [this.createMessage()],
      })
      .then(console.log(`Produced message #${this.count} from producer #${this.id}`))
      .catch(e => console.error(`[example/producer] ${e.message}`, e));
  }

  start() {
    this.producer.connect()
      .then(() => {
        console.log(`Producer #${this.id} connected to kafka`);
        setInterval(this.sendMessage, 1000 * this.id);
      })
      .catch(err => console.log(err));    
  }
}

module.exports.Producer = Producer;
