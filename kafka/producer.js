const { producer } = require("../config/kafka");

async function sendProductToKafka(product) {
  try {
    await producer.connect();

    await producer.send({
      topic: "product-topic",
      messages: [{ key: "product-key", value: JSON.stringify(product) }],
    });

    await producer.disconnect();
  } catch (error) {
    console.log(`Error in kafaka consumer file >======> ${error}`);
  }
}

module.exports = {
  sendProductToKafka,
};
