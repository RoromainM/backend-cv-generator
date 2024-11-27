const express = require('express');
const router = express.Router();
const reconnandationController = require('../controllers/recommandation');
const authMiddleware = require('../middleware/jwt');

router.post('/', authMiddleware, reconnandationController.createRecommandataion);

router.get('/:CVNote', authMiddleware, reconnandationController.getRecommendationsForCV);

router.delete('/:id', authMiddleware, reconnandationController.deleteRecommendation);

router.get('/', authMiddleware, reconnandationController.getRecommendationsForUser);

module.exports = router;
