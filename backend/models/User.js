const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    poste: {
      type: String,
      enum: [
        "Manager",
        "Vendeur",
        "Technicien",
        "Comptable",
        "Assistant",
        "Chef de Produit",
        "Développeur Web",
        "Analyste",
        "Stock Manager",
      ],
      default: "Vendeur",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
