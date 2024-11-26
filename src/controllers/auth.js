const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

// Contrôleur pour l'inscription d'un utilisateur
module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // Vérifier que tous les champs nécessaires sont fournis
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).send({
          error: 'Tous les champs sont requis (firstname, lastname, email, password).'
        });
      }

      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });

      // Sauvegarde dans la base de données
      await newUser.save();

      // Réponse de succès avec les informations de l'utilisateur (sans mot de passe)
      res.status(201).send({
        success: true,
        user: {
          firstname,
          lastname,
          email
        }
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erreur lors de l\'inscription de l\'utilisateur.'
      });
    }
  }
};
