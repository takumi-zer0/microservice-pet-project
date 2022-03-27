const redis = require('redis');

async function main() {
  const client = redis.createClient();

  const subscriber = client.duplicate();
  const publisher = client.duplicate();

  await subscriber.connect();
  await publisher.connect();

  await subscriber.subscribe('article', (message) => {

    let msg = JSON.parse(message)
    let num = msg.number + 10000
    console.log(num); // 'message'

    publisher.publish('summed', JSON.stringify(num));
    console.log("pubslising", num)
  });
}

main()