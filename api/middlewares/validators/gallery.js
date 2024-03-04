const {validate, body} = require("./validator");

const validateGalleryCreate = async (req, res, next) => {
    const validationRules = [
        body('road').isNotEmpty().isString().withMessage('La voie doit être une chaîne de caractères'),
        body('zipcode').isNotEmpty().isString().withMessage('Le code postal doit être une chaîne de caractères'),
        body('city').isNotEmpty().isString().withMessage('La ville doit être une chaîne de caractères'),
        body('country').isNotEmpty().isString().withMessage('Le pays doit être une chaîne de caractères'),
        body('image').isNotEmpty().isString().withMessage("L'image doit être une chaîne de caractères"),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
    ];

    await validate(req, res, next, validationRules);
};

const validateGalleryUpdate = async (req, res, next) => {
    const validationRules = [
        body('road').optional().isString().withMessage('La route doit être une chaîne de caractères'),
        body('zipcode').optional().isString().withMessage('Le code postal doit être une chaîne de caractères'),
        body('city').optional().isString().withMessage('La ville doit être une chaîne de caractères'),
        body('country').optional().isString().withMessage('Le pays doit être une chaîne de caractères'),
        body('image').optional().isString().withMessage("L'image doit être une chaîne de caractères"),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
    ];

    await validate(req, res, next, validationRules);
};

module.exports = {validateGalleryCreate, validateGalleryUpdate};
