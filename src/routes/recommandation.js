const express = require('express');
const router = express.Router();
const v_reconnandationController = require('../controllers/recommandation');
const v_authMiddleware = require('../middleware/jwt');

router.post('/', v_authMiddleware, v_reconnandationController.createRecommandataion);

router.get('/:CVNote', v_reconnandationController.getRecommendationsForCV);

router.delete('/:id', v_authMiddleware, v_reconnandationController.deleteRecommendation);

router.get('/', v_authMiddleware, v_reconnandationController.getRecommendationsForUser);

router.put('/:id', v_authMiddleware, v_reconnandationController.updateRecommendation);

module.exports = router;
