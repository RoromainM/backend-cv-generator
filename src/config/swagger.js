// src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Définir les options de configuration pour Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Version correcte d'OpenAPI
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'La documentation de mon API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // L'URL de production du back.
        //url:  'https://backend-cv-generator.onrender.com/api',
      },
    ],
  },
  // Chemin vers les fichiers contenant des annotations Swagger
  apis: ['./src/routes/*.js'], // Si tes routes sont dans un dossier "routes"
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
