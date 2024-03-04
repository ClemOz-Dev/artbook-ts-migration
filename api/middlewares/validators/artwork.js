const {validate, body} = require("./validator");

const validateArtworkUpdate = async (req, res, next) => {
    const validationRules = [
        body('name').optional().isString().withMessage('Le nom doit être une chaîne de caractères'),
        body('image').optional().isString().withMessage('L\'image doit être une chaîne de caractères'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
        body('categoryId').optional().isNumeric().withMessage('La catégorie doit être un nombre'),
    ];

    await validate(req, res, next, validationRules);
};


const validateArtworkCreate = async (req, res, next) => {
    const validationRules = [
        body('name').isNotEmpty().isString().withMessage('Le nom doit être une chaîne de caractères'),
        body('image').isString().withMessage('L\'image doit être une chaîne de caractères').exists().withMessage('Image requise'),
        body('description').isString().withMessage('La description doit être une chaîne de caractères').exists().withMessage('Description requise'),
        body('categoryId').isNumeric().withMessage('La catégorie doit être un nombre').exists().withMessage('Catégorie requise'),
    ];

    await validate(req, res, next, validationRules);
};

module.exports = {validateArtworkUpdate, validateArtworkCreate};
