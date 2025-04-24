const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received token (auth):", token); 
  if (!token) {
    console.log("No token provided (auth)");
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "nexusshopsecret"
    );
    console.log("Decoded token (auth):", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error (auth):", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "nexusshopsecret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
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
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "nexusshopsecret",
      { expiresIn: "1d" }
    );

    console.log("Generated token (login):", token);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userId: user.userId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (req.body.password) {
      user.password = req.body.password; // Assuming password is hashed in the User model
    }
    await user.save();

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
