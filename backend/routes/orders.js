const express = require("express");
const Order = require("../models/Order");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "nexusshopsecret",
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    }
  );
};

// Create a new order
router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      tax,
      total,
    } = req.body;

    // Validate request body
    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items array is required and must not be empty" });
    }

    const validatedItems = items.map((item, index) => {
      if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
        throw new Error(
          `Invalid product ID at index ${index}: ${item.productId}`
        );
      }
      return {
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId),
      };
    });

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const order = new Order({
      user: new mongoose.Types.ObjectId(user),
      items: validatedItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      tax,
      total,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Create order error:", error.message);
    if (error.message.includes("Invalid product ID")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all orders
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.isPaid = status === "paid";
    }

    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }).select("_id");

      query.user = { $in: users.map((u) => u._id) };
    }

    const orders = await Order.find(query)
      .populate("user", "name email")
      .lean();

    res.json(orders); // Simplified, assuming orders are already in desired format
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order._id = order._id.toString();
    order.user = order.user.toString();
    order.items = order.items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
    }));

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update order payment status
router.put("/:id/pay", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("Update order payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an order
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
