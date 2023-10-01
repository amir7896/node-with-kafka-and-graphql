const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-api",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer = kafka.consumer({ groupId: "test-group" });

module.exports = {
  producer,
  consumer,
};
