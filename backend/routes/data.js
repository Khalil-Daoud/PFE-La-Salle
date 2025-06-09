const express = require("express");
const Data = require("../models/Data"); // Assure-toi que ton fichier modèle s'appelle 'data.js'

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const product = await Data.findById(req.params.id);
    console.log("Product data fetched:", product);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.json(product);
  } catch (err) {
    console.error("Erreur lors de la récupération du produit:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
