const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    createdAt: { type: String, required: true },
    featured: { type: Boolean, default: true },
    productId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
