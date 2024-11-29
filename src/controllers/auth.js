const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password) {
        return res.status(400).send({
          error: 'Tous les champs sont requis (firstname, lastname, email, password).'
        });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          error: 'Un utilisateur avec cet email existe déjà.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });

      await newUser.save();

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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send({
          error: 'Email et mot de passe sont requis.'
        });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({
          error: 'Utilisateur non trouvé.'
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({
          error: 'Mot de passe incorrect.'
        });
      }
  
      // Générer le token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          firstname: user.firstname,
          lastname: user.lastname,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).send({
        success: true,
        message: 'Connexion réussie.',
        token,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        }
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erreur lors de la connexion.'
      });
    }
  }
  ,
  
  
  
// Deconnexion d'un utilisateur
  logout: (req, res) => {
    res.status(200).send({
      success: true,
      message: 'Déconnexion réussie.'
    });
  },

// Suppression d'un utilisateur
deleteUser: async (req, res) => {
    try {
      const userId = req.params.id; 
  
      // Verification si l'utilisateur connecté a le droit de supprimer cet utilisateur
      if (req.user.userId !== userId) {
        return res.status(403).send({
          error: 'Vous n\'êtes pas autorisé à supprimer cet utilisateur.'
        });
      }
  
      const user = await UserModel.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).send({
          error: 'Utilisateur non trouvé.'
        });
      }
  
      res.status(200).send({
        success: true,
        message: 'Utilisateur supprimé avec succès.'
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erreur lors de la suppression de l\'utilisateur.'
      });
    }
  },


  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstname, lastname, email, password } = req.body;
  
      if (req.user.userId !== userId) {
        return res.status(403).send({
          error: 'Vous n\'êtes pas autorisé à modifier cet utilisateur.'
        });
      }
  
      const updates = {};
      if (firstname) updates.firstname = firstname;
      if (lastname) updates.lastname = lastname;
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10);
  
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!updatedUser) {
        return res.status(404).send({
          error: 'Utilisateur non trouvé.'
        });
      }
  
      res.status(200).send({
        success: true,
        message: 'Utilisateur mis à jour avec succès.',
        user: updatedUser // Renvoie l'utilisateur MAJ
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Erreur lors de la mise à jour de l\'utilisateur.'
      });
    }
  },
  
  
  


};
