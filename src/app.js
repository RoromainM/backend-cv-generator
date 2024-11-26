require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connection à MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Connection has been established successfully');
    })
    .catch((error) => {
        console.error('❌ Unable to connect database: ', error);
    });

// Importation des routes
const cvRouter = require('./routes'); // Importez l'index des routes

// Utilisation des routes
app.use('/api', cvRouter); // Montez les routes sous le préfixe /api

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
