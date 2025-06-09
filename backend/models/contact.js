const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false },
    subject: { type: String, required: false },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactSchema);
