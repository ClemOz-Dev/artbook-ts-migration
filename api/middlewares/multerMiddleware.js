const multer = require('multer');
const cloudinary = require('../../config/cloudinaryConfig');
const logger = require("../../config/winston");

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Format de fichier non pris en charge'));
        }
    },
}).single('image');

const multerMiddleware = (req, res, next) => {
    upload(req, res, (error) => {
        if (error) {
            return res.status(400).json({error: 'Erreur lors de l\'envoi du fichier'});
        }
        if (!req.file) {
            return res.status(422).json({image: "Aucun fichier n'a été téléchargé."});
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        cloudinary.uploader.upload(dataURI, {resource_type: 'auto'})
            .then((result) => {
                req.body.image = result.secure_url;
                next();
            })
            .catch((cloudinaryError) => {
                logger.error(cloudinaryError);
                return res.status(400).json({error: 'Erreur lors de l\'envoi du fichier vers Cloudinary'});
            });
    });
};

module.exports = multerMiddleware;
