const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Récupérer les produits 
router.get("/", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    let filters = {};
    let sort = {}; 

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = {
        $gte: parseFloat(req.query.minPrice),
        $lte: parseFloat(req.query.maxPrice),
      };
    }

    switch (req.query.sort) {
      case "price-low":
        sort = { price: 1 }; 
        break;
      case "price-high":
        sort = { price: -1 }; 
        break;
      case "name-asc":
        sort = { name: 1 };  
        break;
      case "name-desc":
        sort = { name: -1 };  
        break;
      default:
        sort = {};  
        break;
    }

    // Fetching products with filters and sorting
    const products = await Product.find(filters).sort(sort);
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Get single product
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

// Ajouter des produits d'initialisation si nécessaire
router.post("/init", async (req, res) => {
  try {
    // Vérifie si les produits existent déjà
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: "Products already initialized" });
    }

    // Produits d'exemple
    const sampleProducts = [
      {
        name: "Audio Speaker",
        description: "High-quality audio speaker",
        price: 199.99,
        category: "Audio",
        image: "/placeholder.svg",
        rating: 4.5,
        numReviews: 10,
        countInStock: 5,
      },
      {
        name: "Wearable Watch",
        description: "Smart wearable for fitness tracking",
        price: 299.99,
        category: "Wearables",
        image: "/placeholder.svg",
        rating: 4.0,
        numReviews: 15,
        countInStock: 8,
      },
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
    ];

    await Product.insertMany(sampleProducts);
    res.status(201).json({ message: "Products initialized successfully" });
  } catch (error) {
    console.error("Init products error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
