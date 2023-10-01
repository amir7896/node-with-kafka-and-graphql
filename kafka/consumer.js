const { consumer } = require("../config/kafka");

async function setupProductConsumer() {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: "product-topic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const productEventData = JSON.parse(message.value.toString());

        if (productEventData.action === "create") {
          console.log("Received product create event:", productEventData.data);
        } else if (productEventData.action === "update") {
          // Handle product update event
          console.log("Received product update event:", productEventData.data);
        } else if (productEventData.action === "delete") {
          console.log("Received product delete event:", productEventData.data);
        }
      },
    });
  } catch (error) {
    console.log(`Error in kafka consumer file >====>`, error);
  }
}

module.exports = {
  setupProductConsumer,
};
