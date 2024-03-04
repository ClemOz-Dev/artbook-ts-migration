const {Router} = require('express');
const controllers = require('../controllers');
const {authMiddleware, isOwner} = require("../middlewares/authMiddleware");
const {isArtist} = require("../middlewares/roleMiddleware");
const {validateArtworkCreate} = require("../middlewares/validators/artwork");
const multerMiddleware = require("../middlewares/multerMiddleware");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Artworks
 */

/**
 * @swagger
 * /api/artworks:
 *   get:
 *     tags: [Artworks]
 *     summary: Récupérer la liste des œuvres d'art
 *     description: Récupérer la liste des œuvres d'art.
 *     responses:
 *       200:
 *         description: Liste des œuvres d'art récupérée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de la liste des œuvres d'art
 */
router.get('/', controllers.ArtworkController.findAll);


// /**
//  * @swagger
//  * /api/artworks/artist:
//  *   get:
//  *     tags: [Artworks]
//  *     summary: Récupérer la liste des œuvres d'art
//  *     description: Récupérer la liste des œuvres d'art.
//  */
router.get('/artist', controllers.ArtworkController.getArtworksWithArtist);

// /**
//  * @swagger
//  * /api/artworks/exhibitions:
//  *   get:
//  *     tags: [Artworks]
//  *     summary: Récupérer la liste des œuvres d'art
//  *     description: Récupérer la liste des œuvres d'art.
//  */
router.get('/exhibitions', controllers.ArtworkController.getArtworksInExhibition);

/**
 * @swagger
 * /api/artworks/{id}:
 *   get:
 *     tags: [Artworks]
 *     summary: Récupérer une œuvre d'art par son ID
 *     description: Récupérer une œuvre d'art spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Œuvre d'art récupérée avec succès
 *       404:
 *         description: L'œuvre d'art avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de l'œuvre d'art
 */
router.get('/:id', controllers.ArtworkController.getArtworkById);

/**
 * @swagger
 * /api/artworks:
 *   post:
 *     tags: [Artworks]
 *     summary: Créer une nouvelle œuvre d'art
 *     description: Créez une nouvelle œuvre d'art.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: artworkData
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Œuvre d'art créée avec succès
 *       500:
 *         description: Une erreur s'est produite lors de la création de l'œuvre d'art
 */
router.post('/', authMiddleware, isArtist, multerMiddleware, validateArtworkCreate, controllers.ArtworkController.create);

/**
 * @swagger
 * /api/artworks/{id}:
 *   put:
 *     tags: [Artworks]
 *     summary: Mettre à jour une œuvre d'art par son ID
 *     description: Mettez à jour les informations d'une œuvre d'art spécifique en utilisant son ID.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: artworkData
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             image:
 *               type: string
 *             description:
 *               type: string
 *             user_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Informations de l'œuvre d'art mises à jour avec succès
 *       404:
 *         description: L'œuvre d'art avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la mise à jour des informations de l'œuvre d'art
 */
router.put('/:id', authMiddleware, isArtist, isOwner, controllers.ArtworkController.update);

/**
 * @swagger
 * /api/artworks/{id}:
 *   delete:
 *     tags: [Artworks]
 *     summary: Supprimer une œuvre d'art par son ID
 *     description: Supprimez une œuvre d'art spécifique en utilisant son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Œuvre d'art supprimée avec succès
 *       404:
 *         description: L'œuvre d'art avec l'ID spécifié n'a pas été trouvée
 *       500:
 *         description: Une erreur s'est produite lors de la suppression de l'œuvre d'art
 */
router.delete('/:id', authMiddleware, isArtist, isOwner, controllers.ArtworkController.delete);

/**
 * @swagger
 * /api/artworks/category/{categoryId}:
 *   get:
 *     tags: [Artworks]
 *     summary: Récupérer les œuvres d'art d'une catégorie spécifique
 *     description: Récupérez les œuvres d'art appartenant à une catégorie spécifique en utilisant l'ID de la catégorie.
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Œuvres d'art de la catégorie récupérées avec succès
 *       404:
 *         description: Catégorie non trouvée ou aucune œuvre associée à cette catégorie
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des œuvres d'art
 */
router.get('/category/:categoryId', controllers.ArtworkController.getArtworksByCategory);

module.exports = router;
