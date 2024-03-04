const {Router} = require('express');
const controllers = require('../controllers');
const {authMiddleware, isOwner} = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");
const router = Router();


/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Retrieve user's own data
 */
router.get('/me', authMiddleware, controllers.UserController.findMe);


/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Retrieve a list of galleries
 */
router.get('/', controllers.UserController.findAll);

/**
 * @swagger
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Utilisateurs]
 */
router.get('/:id', controllers.UserController.findById);

/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     tags: [Utilisateurs]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: role
 *         in: formData
 *         required: true
 *         type: int
 */
router.post('/', controllers.UserController.create);

/**
 * @swagger
 *
 * /api/users:
 *   put:
 *     tags: [Utilisateurs]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         in: formData
 *         type: string
 *       - name: last_name
 *         in: formData
 *         type: string
 *       - name: description
 *         in: formData
 *         type: string
 *       - name: image
 *         in: formData
 *         type: string
 */
router.put('/:id', authMiddleware, isOwner, controllers.UserController.update);

router.put('/:id/with-image', authMiddleware, isOwner, multerMiddleware, controllers.UserController.update);


module.exports = router;
