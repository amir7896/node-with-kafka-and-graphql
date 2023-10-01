const Product = require("../models/product");
const kafkaProducer = require("../kafka/producer");

// Create a new product
exports.createProduct = (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });

    product.save((err, savedProduct) => {
      if (err) {
        return res.status(500).json({ error: "Error creating product" });
      }

      kafkaProducer.sendProductToKafka({
        action: "create",
        data: savedProduct,
      });

      res.json(savedProduct);
    });
  } catch (error) {
    console.log(`Error in create product api  >=====>`, error);
  }
};

// Update a product by ID
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;

  Product.findByIdAndUpdate(
    productId,
    { name, description, price },
    { new: true },
    (err, updatedProduct) => {
      if (err) {
        return res.status(500).json({ error: "Error updating product" });
      }
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      kafkaProducer.sendProductToKafka({
        action: "update",
        data: updatedProduct,
      });

      res.json(updatedProduct);
    }
  );
};

// Delete a product by ID
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId, (err, removedProduct) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting product" });
    }
    if (!removedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    kafkaProducer.sendProductToKafka({
      action: "delete",
      data: removedProduct,
    });

    res.json(removedProduct);
  });
};
