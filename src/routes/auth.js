const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');  // Assurez-vous que le chemin est correct

// Route pour l'inscription (register)
router.post('/register', authController.register);

module.exports = router;
