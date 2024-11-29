const express = require('express');
const router = express.Router();
const v_recommandationController = require('../controllers/recommandation');
const v_authMiddleware = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Gestion des recommandations liées aux CV
 */

/**
 * @swagger
 * /recommendations:
 *   post:
 *     summary: Créer une recommandation pour un CV
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CVNote:
 *                 type: string
 *                 description: L'ID du CV lié à la recommandation
 *               content:
 *                 type: string
 *                 description: Contenu de la recommandation
 *     responses:
 *       200:
 *         description: Recommandation ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 v_recommendation:
 *                   $ref: '#/components/schemas/Recommendation'
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur lors de l'ajout de la recommandation
 */
router.post('/', v_authMiddleware, v_recommandationController.createRecommandataion);

/**
 * @swagger
 * /recommendations/{CVNote}:
 *   get:
 *     summary: Récupérer les recommandations d'un CV spécifique
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: CVNote
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV pour lequel récupérer les recommandations
 *     responses:
 *       200:
 *         description: Liste des recommandations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Erreur lors de la récupération des recommandations
 */
router.get('/:CVNote', v_recommandationController.getRecommendationsForCV);

/**
 * @swagger
 * /recommendations/{id}:
 *   delete:
 *     summary: Supprimer une recommandation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la recommandation à supprimer
 *     responses:
 *       200:
 *         description: Recommandation supprimée avec succès
 *       403:
 *         description: Action non autorisée
 *       404:
 *         description: Recommandation non trouvée
 *       500:
 *         description: Erreur lors de la suppression de la recommandation
 */
router.delete('/:id', v_authMiddleware, v_recommandationController.deleteRecommendation);

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Récupérer les recommandations que l'utilisateur a recu sur ses CV
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des recommandations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Erreur lors de la récupération des recommandations
 */
router.get('/', v_authMiddleware, v_recommandationController.getRecommendationsForUser);

/**
 * @swagger
 * /recommendations/{id}:
 *   patch:
 *     summary: Mettre à jour une recommandation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la recommandation à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nouveau contenu de la recommandation
 *     responses:
 *       200:
 *         description: Recommandation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 v_recommendation:
 *                   $ref: '#/components/schemas/Recommendation'
 *       403:
 *         description: Action non autorisée
 *       404:
 *         description: Recommandation non trouvée
 *       500:
 *         description: Erreur lors de la modification de la recommandation
 */
router.patch('/:id', v_authMiddleware, v_recommandationController.updateRecommendation);

module.exports = router;
