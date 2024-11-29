const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const jwtMiddleware = require('../middleware/jwt');




/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Julien
 *               lastname:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Dodo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: julien@exemple.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Julien123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 firstname:
 *                   type: string
 *                   description: The first name of the user.
 *                   example: Julien
 *                 lastname:
 *                   type: string
 *                   description: The last name of the user.
 *                   example: Dodo
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                   example: julien@exemple.com
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', authController.register);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in with the provided credentials (email and password).
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: julien@exemple.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Julien123
 *     responses:
 *       200:
 *         description: Login successful. Returns a token for authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token to authenticate further requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Invalid email or password.
 *       401:
 *         description: Unauthorized - Invalid credentials provided.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', authController.login);




/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the user by invalidating the JWT token. Requires email, password, and token for authentication.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - token
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: julien.dodo@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Julien123
 *               Bearer:
 *                 type: string
 *                 description: The JWT token for authentication.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Successfully logged out and token invalidated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the logout was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Confirmation message for logout.
 *                   example: "Déconnexion réussie."
 *       400:
 *         description: Bad request - Missing or invalid parameters.
 *       401:
 *         description: Unauthorized - Invalid credentials or token.
 *       500:
 *         description: Internal server error.
 */
router.post('/logout', jwtMiddleware, authController.logout);




/**
 * @swagger
 * /api/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user with the specified ID from the system. Requires authentication with a valid JWT token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deletion was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the deletion.
 *                   example: "Utilisateur supprimé avec succès."
 *       400:
 *         description: Bad request - Invalid ID format or missing ID.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       404:
 *         description: Not Found - The user with the specified ID does not exist.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete/:id', jwtMiddleware, authController.deleteUser);



/**
 * @swagger
 * /api/auth/update/{id}:
 *   patch:
 *     summary: Update a user's information
 *     description: Updates the information of an existing user. Requires authentication with a valid JWT token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: Julien
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Dodo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: julien@exemple.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Julien123
 *     responses:
 *       200:
 *         description: User information successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the update was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message confirming the update.
 *                   example: "Informations de l'utilisateur mises à jour avec succès."
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *       404:
 *         description: Not Found - The user with the specified ID does not exist.
 *       500:
 *         description: Internal server error.
 */
router.patch('/update/:id', jwtMiddleware, authController.updateUser);



module.exports = router;