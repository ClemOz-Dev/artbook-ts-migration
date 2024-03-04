const {body} = require('express-validator');
const {validate} = require("./validator");

const validateUserUpdate = async (req, res, next) => {
    const validationRules = [
        body('firstName').optional().isString().withMessage('Le prénom doit être une chaîne de caractères'),
        body('lastName').optional().isString().withMessage('Le nom doit être une chaîne de caractères'),
        body('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
        body('image').optional().isNumeric().withMessage('L\'image doit être une chaîne de caractères'),
        body('birthdate').optional().isDate().withMessage('La date d\'anniversaire doit être une date valide'),
        body('nationality').optional().isString().withMessage('Le nom doit être une chaîne de caractères'),
    ];

    await validate(req, res, next, validationRules);
};

module.exports = {validateUserUpdate};
