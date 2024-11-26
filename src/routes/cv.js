const express = require('express');
const cvController = require('../controllers/cv');
const router = express.Router();

// Route pour créer un CV
router.post('/', cvController.createCv);

// Route pour récupérer un CV
router.get('/:id', cvController.getCvs);

// Route pour modifier un CV
router.patch('/:id', cvController.updateCv);

module.exports = router;
