const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

async function pub() {
  await publisher.connect();
  await subscriber.connect()


  await subscriber.subscribe('answer', (message) => {

    console.log(message)
  });
}

pub()

const publis = async () => {
  const article = {
    id: '123456',
    name: 'Using Redis Pub/Sub with Node.js',
    blog: 'Logrocket Blog',
    number: Math.floor(Math.random() * 10000)
  };

  await publisher.publish('article', JSON.stringify(article));
  console.log("publishing: ", article)
}


setInterval(publis, 1000);