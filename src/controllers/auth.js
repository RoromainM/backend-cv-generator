const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken pour générer le token

// Contrôleur pour l'inscription
module.exports = {
  // Inscription (registre déjà implémenté)
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // Vérifier que tous les champs nécessaires sont fournis
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).send({
          error: 'Tous les champs sont requis (firstname, lastname, email, password).'
        });
      }

      // Vérifier si un utilisateur existe déjà avec cet email
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          error: 'Un utilisateur avec cet email existe déjà.'
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
  },

  // Login : authentification et génération de JWT
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Vérifier que l'email et le mot de passe sont fournis
      if (!email || !password) {
        return res.status(400).send({
          error: 'Email et mot de passe sont requis.'
        });
      }

      // Vérifier si l'utilisateur existe
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({
          error: 'Utilisateur non trouvé.'
        });
      }

      // Comparer le mot de passe fourni avec celui en base de données
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({
          error: 'Mot de passe incorrect.'
        });
      }

      // Générer un JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },  // Payload
        process.env.JWT_SECRET,                    // Clé secrète (à définir dans .env)
        { expiresIn: '1h' }                        // Expiration du token
      );

      // Répondre avec le token
      res.status(200).send({
        success: true,
        message: 'Connexion réussie.',
        token
      });

    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erreur lors de la connexion.'
      });
    }
  }
};
