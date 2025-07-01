const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Received token (users):", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, token manquant" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "nexusshopsecret"
    );
    console.log("Decoded token (users):", decoded);
    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: "Accès réservé aux administrateurs" });
    }
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    console.error("Token verification error (users):", error);
    res.status(401).json({ message: "Token invalide" });
  }
};

// Get all users (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    let query = {};
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      query = {
        $or: [{ name: searchRegex }, { email: searchRegex }],
      };
    }
    if (req.query.isAdmin) {
      query.isAdmin = req.query.isAdmin === "true";
    }
    if (req.query.poste) {
      query.poste = req.query.poste;
    }
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Get single user (admin only)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Create user (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, password, isAdmin, poste, userId } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Le nom, l'email et le mot de passe sont requis" });
    }
    if (typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Le nom doit être une chaîne non vide" });
    }
    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "L'email est invalide" });
    }
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }
    if (
      poste &&
      !["Manager", "Vendeur", "Technicien", "Comptable", "Assistant"].includes(
        poste
      )
    ) {
      return res.status(400).json({ message: "Poste invalide" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'email existe déjà" });
    }

    const lastUser = await User.findOne().sort({ userId: -1 }).exec();

    let nextUserId = "1"; // Valeur par défaut si aucun utilisateur
    if (lastUser && lastUser.userId) {
      // Convertir en nombre et incrémenter, puis convertir en string
      const lastId = parseInt(lastUser.userId, 10);
      nextUserId = String(lastId + 1);
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password: await bcrypt.hash(password, 10),
      isAdmin: isAdmin !== undefined ? Boolean(isAdmin) : false,
      poste: poste || "Vendeur",
      userId: nextUserId,
      createdAt: new Date(),
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: "Utilisateur ajouté avec succès",
      user: {
        ...savedUser.toObject(),
        id: savedUser._id.toString(),
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Update user (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, isAdmin, poste } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Le nom et l'email sont requis" });
    }
    if (typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Le nom doit être une chaîne non vide" });
    }
    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "L'email est invalide" });
    }
    if (
      poste &&
      !["Manager", "Vendeur", "Technicien", "Comptable", "Assistant"].includes(
        poste
      )
    ) {
      return res.status(400).json({ message: "Poste invalide" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.name = name.trim();
    user.email = email.trim();
    user.isAdmin = isAdmin !== undefined ? Boolean(isAdmin) : user.isAdmin;
    user.poste = poste || user.poste;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: {
        ...updatedUser.toObject(),
        id: updatedUser._id.toString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Delete user (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
