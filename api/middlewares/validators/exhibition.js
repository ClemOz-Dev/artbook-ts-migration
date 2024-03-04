const {validate, body} = require("./validator");

const validateExhibitionCreate = async (req, res, next) => {
    const validationRules = [
        body('name').isNotEmpty().isString().withMessage('Le nom doit être une chaîne de caractères'),
        body('description').isNotEmpty().isString().withMessage('La description doit être une chaîne de caractères'),
        body('galleryId').isNotEmpty().isNumeric().withMessage('L\'ID de la galerie associée doit être un nombre'),
        body('startDate').isNotEmpty().isDate().withMessage('La date de début de l\'exposition doit être une date valide')
            .custom((startDate, {req}) => {
                const endDate = req.body.endDate;
                if (startDate >= endDate) {
                    throw new Error('La date de début doit être antérieure à la date de fin');
                }
                return true;
            }),
        body('endDate').isNotEmpty().isDate().withMessage('La date de fin de l\'exposition doit être une date valide'),
        body('artworks').isNotEmpty().isArray({min: 1}).withMessage('L\'exposition doit contenir au moins une oeuvre'),
    ];

    await validate(req, res, next, validationRules);
};

const validateExhibitionUpdate = async (req, res, next) => {
    const validationRules = [
        body('name').optional().isString().withMessage('Le nom de l\'exposition doit être une chaîne de caractères'),
        body('description').optional().isString().withMessage('La description de l\'exposition doit être une chaîne de caractères'),
        body('galleryId').optional().isNumeric().withMessage('L\'ID de la galerie associée doit être un nombre'),
        body('startDate').optional().isDate().withMessage('La date de début de l\'exposition doit être une date valide'),
        body('endDate').optional().isDate().withMessage('La date de fin de l\'exposition doit être une date valide')
    ];

    await validate(req, res, next, validationRules);
};

module.exports = {validateExhibitionCreate, validateExhibitionUpdate};
