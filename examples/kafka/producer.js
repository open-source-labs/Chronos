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

  constructor(){
    this.producer = kafka.producer();
    this.id = id;
    this.topic = id.toString();
    this.count = 1;
  }

  createMessage() {
    return {
      key: this.id,
      value: `This is message ${this.count++} from producer #${this.id}`,
    };
  }

  sendMessage() {
    return this.producer
      .send({
        topic: `Producer #${this.topic}`,
        messages: [this.createMessage()],
      })
      .then(console.log(`Produced message #${this.count++} from producer #${this.id}`))
      .catch(e => console.error(`[example/producer] ${e.message}`, e));
  }

  async start() {
    await this.producer.connect();
    setInterval(this.sendMessage(), 1000 * this.id);
  }
}

module.exports.Producer = Producer;
