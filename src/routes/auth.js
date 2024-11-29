const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const jwtMiddleware = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

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
 * tags:
 *   name: Login
 *   description: API for user login
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in with the provided credentials (email and password).
 *     tags:
 *       - Login
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


router.get('/protected', jwtMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(400).send({ error: 'Utilisateur non trouvé.' });
  }

  res.status(200).send({
    success: true,
    message: 'Accès autorisé à la ressource protégée.',
    user: req.user 
  });
});

/**
 * @swagger
 * tags:
 *   name: Logout 
 *   description: API for logout user
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the user by invalidating the JWT token. Requires email, password, and token for authentication.
 *     tags:
 *       - Logout
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
router.delete('/delete/:id', jwtMiddleware, authController.deleteUser);

router.patch('/update/:id', jwtMiddleware, authController.updateUser);




module.exports = router;
