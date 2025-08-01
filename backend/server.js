require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const dataRoutes = require("./routes/data"); // Ensure this route is defined
const contactRoutes = require("./routes/contact"); // Ensure this route is defined
const app = express();
const PORT = process.env.PORT || 5000;
const usersRoutes = require("./routes/users");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nexusshop")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", usersRoutes);
// Basic route
app.get("/", (req, res) => {
  res.send("Ooredoo API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
