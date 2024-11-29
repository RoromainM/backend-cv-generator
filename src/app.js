require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Route d'authentification
const { swaggerUi, swaggerSpec } = require('./config/swagger'); // Importer la configuration de Swagger
const cors = require('cors');
const app = express();
const apiRouter = require('./routes'); // Autres routes de ton API




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

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// Middleware pour servir Swagger UI à l'URL /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'API');
});

// Autres routes 
app.get('/user', (req, res) => {
  res.send('User data');
});
