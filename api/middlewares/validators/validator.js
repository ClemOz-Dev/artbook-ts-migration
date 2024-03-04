const {validationResult, body} = require('express-validator');

const customBody = (fieldName) => {
    const customBodyInstance = body(fieldName);

    customBodyInstance.isNotEmpty = function () {
        customBodyInstance.custom((value, {req}) => {
            if (!value) {
                throw new Error(`${fieldName} requis`);
            }
            return true;
        });
        return customBodyInstance;
    };

    return customBodyInstance;
};

const validate = async (req, res, next, validationRules) => {
    for (const rule of validationRules) {
        await new Promise((resolve) => rule(req, res, resolve));
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach((error) => {
            errorMessages[error.path] = error.msg;
        });

        return res.status(422).json(errorMessages);
    }

    next();
};

module.exports = {
    validate,
    body: customBody,
};
