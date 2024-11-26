const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const jwtMiddleware = require('../middleware/jwt');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/protected', jwtMiddleware, (req, res) => {
    res.status(200).send({
      success: true,
      message: 'Accès autorisé à la ressource protégée.',
      user: req.user
    });
  });

module.exports = router;
