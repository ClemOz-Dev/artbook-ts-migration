const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Artists
 */

/**
 * @swagger
 * /api/artists:
 *   get:
 *     tags: [Artists]
 *     summary: Liste des artistes
 *     description: Récupérer la liste des artistes.
 *     responses:
 *       200:
 *         description: Liste des artistes d'art récupérée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de la liste des artistes
 */
router.get('/', controllers.UserController.getAllArtists);

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     tags: [Artists]
 *     summary: Récupérer un artiste par ID
 *     description: Récupérer un artiste en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'artiste à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artiste récupéré avec succès
 *       404:
 *         description: Artiste non trouvé
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de l'artiste
 */
router.get('/:id', controllers.UserController.getArtistById);

module.exports = router;
