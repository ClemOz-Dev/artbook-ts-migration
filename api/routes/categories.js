const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Récupérer la liste des categories
 *     description: Récupérer la liste des categories en lecture seule.
 *     responses:
 *       200:
 *         description: Liste des categories récupérée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de la liste des categories
 */
router.get('/', controllers.CategoryController.findAll);

module.exports = router;