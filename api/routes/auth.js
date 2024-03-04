const {Router} = require('express');
const controllers = require('../controllers');
const recaptchaMiddleware = require("../middlewares/recaptchaMiddleware");
const {validateRegister, validateLogin} = require("../middlewares/validators/auth")
const router = Router();


/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags: [Authentication]
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
 */
router.post('/login', validateLogin, controllers.AuthController.login);

/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     tags: [Authentication]
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
 *       - name: first_name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: last_name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: role
 *         type: string
 *         required: true
 */
router.post('/register', recaptchaMiddleware, validateRegister, controllers.AuthController.register);

router.post('/logout', controllers.AuthController.logout);

router.post("/forgot-password", controllers.AuthController.forgotPassword);

router.put("/reset-password/:token", controllers.AuthController.resetPassword);

module.exports = router;
