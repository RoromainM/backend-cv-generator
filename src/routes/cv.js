const express = require('express');
const router = express.Router();
const { createCv, getCvs, getCv, updateCv } = require('../controllers/cv');

// Route pour créer un CV
router.post('/', createCv);

// Route pour récupérer tous les CVs
router.get('/', getCvs);

// Route pour récupérer un CV spécifique par ID
router.get('/:id', getCv);

// Route pour mettre à jour un CV par ID
router.put('/:id', updateCv);

module.exports = router;
