const express = require('express');
const cvController = require('../controllers/cv');
const router = express.Router();
const v_authMiddleware = require('../middleware/jwt');

// Route pour créer un CV
router.post('/', cvController.createCv);

// Route pour récupérer tous les CVs
router.get('/', cvController.getCvs);

// Route pour récupérer un CV
router.get('/:id', cvController.getCvById);

// Route pour modifier un CV
router.patch('/:id', v_authMiddleware, cvController.updateCv);

// route pour supprimer un CV
router.delete('/:id', v_authMiddleware, cvController.deleteCv);

module.exports = router;
