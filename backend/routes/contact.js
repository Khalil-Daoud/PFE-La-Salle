const express = require("express");
const ContactMessage = require("../models/contact"); // Ensure the model is correctly imported

const router = express.Router();

// Create a new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Create new contact message
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    const savedMessage = await newMessage.save();
    console.log("Contact message saved:", savedMessage);

    res.status(201).json({ message: "Message envoyé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du message:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
router.get(
  "/",
  async (req, res) => {
    try {
      const contacts = await ContactMessage.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (err) {
      console.error("Erreur lors de la récupération des messages:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

);
module.exports = router;
