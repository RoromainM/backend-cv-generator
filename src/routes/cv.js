const express = require('express');
const cvController = require('../controllers/cv');
const router = express.Router();

// Route pour créer un CV
router.post('/', cvController.createCv);

// Route pour récupérer tous les CVs
router.get('/', cvController.getCvs);

// Route pour récupérer un CV
router.get('/:id', cvController.getCvById);

// Route pour modifier un CV
router.patch('/:id', cvController.updateCv);

// route pour supprimer un CV
router.delete('/:id', cvController.deleteCv);

module.exports = router;
