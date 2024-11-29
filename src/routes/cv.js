const express = require('express');
const cvController = require('../controllers/cv');
const router = express.Router();
const v_authMiddleware = require('../middleware/jwt');

/**
 * @swagger
 * /cv:
 *   post:
 *     summary: Créer un CV
 *     description: Crée un nouveau CV avec les données fournies dans le corps de la requête.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               visibilite:
 *                 type: boolean
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       400:
 *         description: Aucune donnée fournie
 *       500:
 *         description: Erreur serveur
 */
router.post('/', cvController.createCv);

/**
 * @swagger
 * /cv:
 *   get:
 *     summary: Récupérer tous les CVs
 *     description: Retourne la liste de tous les CVs.
 *     responses:
 *       200:
 *         description: Liste des CVs
 *       404:
 *         description: Aucun CV trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/', cvController.getCvs);

/**
 * @swagger
 * /cv/{id}:
 *   get:
 *     summary: Récupérer un CV par son ID
 *     description: Retourne le CV correspondant à l'ID fourni.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du CV à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV trouvé
 *       400:
 *         description: ID invalide
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', cvController.getCvById);

/**
 * @swagger
 * /cv/visible:
 *   get:
 *     summary: Récupérer les CVs visibles
 *     description: Retourne tous les CVs dont la visibilité est activée.
 *     responses:
 *       200:
 *         description: Liste des CVs visibles
 *       404:
 *         description: Aucun CV visible trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/visible', cvController.getVisibleCvs);

/**
 * @swagger
 * /cv/{id}:
 *   patch:
 *     summary: Mettre à jour un CV
 *     description: Met à jour les informations du CV correspondant à l'ID fourni.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du CV à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               visibilite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: CV mis à jour
 *       400:
 *         description: ID invalide
 *       403:
 *         description: Action non autorisée
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch('/:id', v_authMiddleware, cvController.updateCv);

/**
 * @swagger
 * /cv/{id}:
 *   delete:
 *     summary: Supprimer un CV
 *     description: Supprime le CV correspondant à l'ID fourni.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du CV à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV supprimé
 *       400:
 *         description: ID invalide
 *       403:
 *         description: Action non autorisée
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', v_authMiddleware, cvController.deleteCv);



module.exports = router;
