const redis = require('redis');

async function main() {
  const client = redis.createClient();

  const subscriber = client.duplicate();
  const publisher = client.duplicate();

  await subscriber.connect();
  await publisher.connect();

  await subscriber.subscribe('summed', (message) => {

    console.log(message)

    let num = message * 2
    console.log(num); // 'message'

    publisher.publish('answer', JSON.stringify(num));
    console.log("pubslising", num)
  });
}

main()