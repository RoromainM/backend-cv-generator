const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const jwtMiddleware = require('../middleware/jwt');  // Assurez-vous du chemin du middleware

// Route pour l'inscription
router.post('/register', authController.register);

// Route pour le login
router.post('/login', authController.login);

// Exemple de route protégée
router.get('/protected', jwtMiddleware, (req, res) => {
    // Si le token est valide, la requête arrive ici
    res.status(200).send({
      success: true,
      message: 'Accès autorisé à la ressource protégée.',
      user: req.user // Cela contient les données de l'utilisateur extraites du token
    });
  });

module.exports = router;
