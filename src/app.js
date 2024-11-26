require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const cors = require('cors');
const app = express();
const apiRouter = require('./routes');

// Middleware pour sécuriser les headers et gérer les CORS
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connection à MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connection has been established successfully');
    })
    .catch((error) => {
        console.error('❌ Unable to connect to the database: ', error);
    });


// Utilisation des routes
app.use('/api', apiRouter);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello word');
});
