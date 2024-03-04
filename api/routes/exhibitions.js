const { Router } = require('express');
const controllers = require('../controllers');
const {authMiddleware} = require("../middlewares/authMiddleware");
const {isGallerist} = require("../middlewares/roleMiddleware");
const {validateExhibitionCreate} = require("../middlewares/validators/exhibition");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Exhibitions
 */

/**
 * @swagger
 * /api/exhibitions:
 *   get:
 *     tags: [Exhibitions]
 *     summary: Récupérer la liste des expositions
 *     description: Récupérer la liste des expositions avec leurs détails.
 *     responses:
 *       200:
 *         description: Liste des expositions récupérée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de la liste des expositions
 */
router.get('/', controllers.ExhibitionController.findAll);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   get:
 *     tags: [Exhibitions]
 *     summary: Récupérer les détails d'une exposition par son ID
 *     description: Récupérer les détails d'une exposition spécifique en utilisant son ID, y compris les œuvres d'art associées.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Détails de l'exposition récupérés avec succès
 *       404:
 *         description: L'exposition avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des détails de l'exposition
 */
router.get('/:id', controllers.ExhibitionController.getExhibition);

/**
 * @swagger
 * /api/exhibitions:
 *   post:
 *     tags: [Exhibitions]
 *     summary: Créer une nouvelle exposition
 *     description: Créer une nouvelle exposition avec ses détails.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: exhibitionData
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             start_date:
 *               type: string
 *               format: date
 *             end_date:
 *               type: string
 *               format: date
 *             gallery_id:
 *               type: integer
 *     responses:
 *       201:
 *         description: Exposition créée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la création de l'exposition
 */
router.post('/', authMiddleware, isGallerist, validateExhibitionCreate, controllers.ExhibitionController.create);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   put:
 *     tags: [Exhibitions]
 *     summary: Mettre à jour les informations d'une exposition par son ID
 *     description: Mettre à jour les informations d'une exposition spécifique en utilisant son ID.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: exhibitionData
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             start_date:
 *               type: string
 *               format: date
 *             end_date:
 *               type: string
 *               format: date
 *             gallery_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Informations de l'exposition mises à jour avec succès
 *       404:
 *         description: L'exposition avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la mise à jour des informations de l'exposition
 */
router.put('/:id', controllers.ExhibitionController.update);

/**
 * @swagger
 * /api/exhibitions/{id}:
 *   delete:
 *     tags: [Exhibitions]
 *     summary: Supprimer une exposition par son ID
 *     description: Supprimer une exposition spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Exposition supprimée avec succès
 *       404:
 *         description: L'exposition avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la suppression de l'exposition
 */
router.delete('/:id', controllers.ExhibitionController.delete);

module.exports = router;
