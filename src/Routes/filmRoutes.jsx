const express = require('express');
const router = express.Router();
const { Film } = require('../models'); // Importez votre modèle de film

// Route pour obtenir tous les films
router.get('/films', async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Autres routes pour les opérations CRUD sur les films

module.exports = router;