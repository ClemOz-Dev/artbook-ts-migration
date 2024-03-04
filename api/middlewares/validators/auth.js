const {body} = require('express-validator');
const {validate} = require("./validator");


const validateLogin = async (req, res, next) => {
    const loginValidationRules = [
        body('email').isEmail().withMessage('Email invalide').exists().withMessage('Email requis'),
        body('password').exists().withMessage('Mot de passe requis'),
    ];

    await validate(req, res, next, loginValidationRules);
};

const validateRegister = async (req, res, next) => {
    const registerValidationRules = [
        body('email').isEmail().withMessage('Email invalide').exists().withMessage('Email requis'),
        body('password').isLength({min: 8}).withMessage('Le mot de passe doit contenir au moins 8 caractères').exists().withMessage('Mot de passe requis'),
        body('firstName').isString().withMessage('Le prénom doit être une chaîne de caractères').exists().withMessage('Prénom requis'),
        body('lastName').isString().withMessage('Le nom doit être une chaîne de caractères').exists().withMessage('Nom requis'),
        body('roleId').isNumeric().withMessage('Le nom doit être un nombre positif').exists().withMessage('Rôle requis'),
    ];

    await validate(req, res, next, registerValidationRules);
};

module.exports = {
    validateRegister,
    validateLogin,
};
