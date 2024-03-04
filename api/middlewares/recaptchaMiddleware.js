const axios = require('axios');

async function recaptchaMiddleware(req, res, next) {
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaResponse = req.body.recaptcha;

        if (process.env.TEST_MODE === 'true') {
            next();
        } else {
            const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
                params: {
                    secret: secretKey,
                    response: recaptchaResponse,
                },
            });

            const recaptchaData = response.data;

              if (recaptchaData.success) {
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: "Échec de la connexion en raison d'un reCAPTCHA invalide."
                });
            }
        }
    } catch (error) {
        res.status(500).json({success: false, message: "Erreur lors de la validation reCAPTCHA."});
    }
}

module.exports = recaptchaMiddleware;
