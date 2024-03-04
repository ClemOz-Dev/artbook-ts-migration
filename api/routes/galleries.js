const {Router} = require('express');
const controllers = require('../controllers');
const router = Router();
const {authMiddleware, isOwner} = require('../middlewares/authMiddleware');
const {isGallerist} = require("../middlewares/roleMiddleware");
const {validateGalleryCreate} = require("../middlewares/validators/gallery");
const multerMiddleware = require("../middlewares/multerMiddleware");

/**
 * @swagger
 * /api/galleries:
 *   get:
 *     tags: [Galeries]
 *     summary: Retrieve a list of galleries
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get('/', controllers.GalleryController.findAllByGallerist);


/**
 * @swagger
 *
 * /api/galleries/{id}:
 *   get:
 *     tags: [Galeries]
 */
router.get('/:id', controllers.GalleryController.findById);

/**
 * @swagger
 *
 * /api/galleries:
 *   post:
 *     tags: [Galeries]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: road
 *         in: formData
 *         required: true
 *         type: string
 *       - name: zipcode
 *         in: formData
 *         required: true
 *         type: string
 *       - name: city
 *         in: formData
 *         required: true
 *         type: string
 *       - name: country
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         type: string
 */
router.post('/', authMiddleware, isGallerist, multerMiddleware, validateGalleryCreate, controllers.GalleryController.create);

/**
 * @swagger
 *
 * /api/galleries:
 *   put:
 *     tags: [Galeries]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: road
 *         in: formData
 *         type: string
 *       - name: zipcode
 *         in: formData
 *         type: string
 *       - name: city
 *         in: formData
 *         type: string
 *       - name: country
 *         in: formData
 *         type: string
 *       - name: image
 *         in: formData
 *         type: string
 */
router.put('/:id', authMiddleware, isGallerist, isOwner, controllers.GalleryController.update);

/**
 * @swagger
 *
 * /api/galleries/{id}:
 *   delete:
 *     tags: [Galeries]
 */
router.delete('/:id', authMiddleware, isGallerist, isOwner, controllers.GalleryController.delete)


module.exports = router;
