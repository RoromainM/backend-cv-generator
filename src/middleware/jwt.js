const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
module.exports = (req, res, next) => {
  // Récupérer le token dans l'en-tête de la requête (Authorization)
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Récupère le token sans "Bearer"

  if (!token) {
    return res.status(401).send({ error: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Ajouter les informations du token à la requête (par ex. userId)
    next();  // Passer à la suite
  } catch (error) {
    res.status(401).send({ error: 'Token invalide ou expiré.' });
  }
};
