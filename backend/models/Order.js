const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    subtotal: Number,
    shippingPrice: Number,
    tax: Number,
    total: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    paymentResult: {
      id: String,
      status: String,
      updateTime: String,
      emailAddress: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
