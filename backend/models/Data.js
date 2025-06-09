const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    image: String,
    category: String,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
