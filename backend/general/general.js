const jwt = "jsonwebtoken";
const User = "../models/User"; // Add .js extension for ESM
const Product = "../models/Product";

import express from "express";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "nexusshopsecret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "nexusshopsecret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/init", async (req, res) => {
  try {
    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: "Products already initialized" });
    }

    // Sample products
    const sampleProducts = [
      {
        name: "Smartphone X",
        description: "Latest smartphone with advanced features",
        price: 999.99,
        category: "Electronics",
        image: "/placeholder.svg",
        rating: 4.5,
        numReviews: 12,
        countInStock: 10,
      },
      {
        name: "Laptop Pro",
        description: "High-performance laptop for professionals",
        price: 1499.99,
        category: "Electronics",
        image: "/placeholder.svg",
        rating: 4.8,
        numReviews: 8,
        countInStock: 5,
      },
    ];

    await Product.insertMany(sampleProducts);
    res.status(201).json({ message: "Products initialized successfully" });
  } catch (error) {
    console.error("Init products error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
