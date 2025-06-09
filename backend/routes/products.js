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

router.post("/create", async (req, res) => {
  try {
    console.log("Received POST /api/products with body:", req.body);
    const {
      name,
      description,
      price,
      category,
      image,
      rating,
      numReviews,
      countInStock,
      featured,
    } = req.body;

    // Validation des champs requis
    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      !image ||
      rating == null ||
      numReviews == null ||
      countInStock == null
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis doivent être fournis" });
    }

    // Validation des types et valeurs
    if (typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Le nom doit être une chaîne non vide" });
    }
    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ message: "La description doit être une chaîne non vide" });
    }
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Le prix doit être un nombre positif" });
    }
    if (typeof category !== "string" || category.trim() === "") {
      return res
        .status(400)
        .json({ message: "La catégorie doit être une chaîne non vide" });
    }
    if (typeof image !== "string" || image.trim() === "") {
      return res
        .status(400)
        .json({ message: "L'URL de l'image doit être une chaîne non vide" });
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "La note doit être un nombre entre 0 et 5" });
    }
    if (isNaN(numReviews) || numReviews < 0) {
      return res
        .status(400)
        .json({ message: "Le nombre d'avis doit être un nombre positif" });
    }
    if (isNaN(countInStock) || countInStock < 0) {
      return res
        .status(400)
        .json({ message: "La quantité en stock doit être un nombre positif" });
    }

    // Créer un nouveau produit
    const newProduct = new Product({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.trim(),
      image: image.trim(),
      rating: parseFloat(rating),
      numReviews: parseInt(numReviews),
      countInStock: parseInt(countInStock),
      createdAt: new Date().toISOString(),
      featured: featured !== undefined ? Boolean(featured) : true,
      productId: undefined,
    });

    // Sauvegarder le produit
    const savedProduct = await newProduct.save();
    console.log("Saved product to MongoDB:", savedProduct);

    // Mettre à jour productId avec l'_id généré par MongoDB
    savedProduct.productId = savedProduct._id.toString();
    await savedProduct.save();

    res.status(201).json({
      message: "Produit ajouté avec succès",
      product: {
        ...savedProduct.toObject(),
        id: savedProduct._id.toString(),
        productId: savedProduct._id.toString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    console.error("product order error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("Received PUT /api/products/:id with body:", req.body);
    const {
      name,
      description,
      price,
      category,
      image,
      rating,
      numReviews,
      countInStock,
      featured,
    } = req.body;

    // Validation des champs requis
    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      !image ||
      rating == null ||
      numReviews == null ||
      countInStock == null
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis doivent être fournis" });
    }

    // Validation des types et valeurs
    if (typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Le nom doit être une chaîne non vide" });
    }
    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ message: "La description doit être une chaîne non vide" });
    }
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Le prix doit être un nombre positif" });
    }
    if (typeof category !== "string" || category.trim() === "") {
      return res
        .status(400)
        .json({ message: "La catégorie doit être une chaîne non vide" });
    }
    if (typeof image !== "string" || image.trim() === "") {
      return res
        .status(400)
        .json({ message: "L'URL de l'image doit être une chaîne non vide" });
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "La note doit être un nombre entre 0 et 5" });
    }
    if (isNaN(numReviews) || numReviews < 0) {
      return res
        .status(400)
        .json({ message: "Le nombre d'avis doit être un nombre positif" });
    }
    if (isNaN(countInStock) || countInStock < 0) {
      return res
        .status(400)
        .json({ message: "La quantité en stock doit être un nombre positif" });
    }

    // Trouver le produit
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Mettre à jour les champs
    product.name = name.trim();
    product.description = description.trim();
    product.price = parseFloat(price);
    product.category = category.trim();
    product.image = image.trim();
    product.rating = parseFloat(rating);
    product.numReviews = parseInt(numReviews);
    product.countInStock = parseInt(countInStock);
    product.featured =
      featured !== undefined ? Boolean(featured) : product.featured;

    // Sauvegarder les modifications
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Produit mis à jour avec succès",
      product: {
        ...updatedProduct.toObject(),
        id: updatedProduct._id.toString(),
        productId: updatedProduct._id.toString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.get("/data/:id", async (req, res) => {
  try {
    const product = await db.collection("data").findOne({ id: req.params.id });
    console.log("Product data fetched:", product);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
