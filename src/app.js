require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');  // Importer les routes d'authentification

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI)  // Assure-toi que MONGO_URI est bien défini dans ton fichier .env
  .then(() => {
    console.log('✅ Connection has been established successfully');
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database: ', error);
  });

// Routes pour l'authentification
app.use('/api/auth', authRoutes);  // Toute requête vers /api/auth sera traitée par les routes auth

// Route de test
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
