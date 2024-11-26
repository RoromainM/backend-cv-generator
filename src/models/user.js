const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour l'utilisateur
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // Email doit être unique
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Ajoute createdAt et updatedAt automatiquement
});

// Création du modèle d'utilisateur basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
