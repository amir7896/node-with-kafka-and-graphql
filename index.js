// index.js
const express = require("express");
const mongoose = require("mongoose");
const kafkaConsumer = require("./kafka/consumer");

const productRoutes = require("./routes/productRoute");

const app = express();
const port = process.env.PORT || 4000;

// kafak ..
kafkaConsumer.setupProductConsumer();

mongoose.connect(require("./config/db").url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api", productRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
