const express = require('express');
const router = express.Router();
const v_recommandationController = require('../controllers/recommandation');
const v_authMiddleware = require('../middleware/jwt');

router.post('/', v_authMiddleware, v_recommandationController.createRecommandataion);

router.get('/:CVNote', v_recommandationController.getRecommendationsForCV);

router.delete('/:id', v_authMiddleware, v_recommandationController.deleteRecommendation);

router.get('/', v_authMiddleware, v_recommandationController.getRecommendationsForUser);

router.patch('/:id', v_authMiddleware, v_recommandationController.updateRecommendation);

module.exports = router;
