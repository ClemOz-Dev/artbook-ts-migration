const CoreController = require('./coreController');
const galleryRepository = require('../repositories/galleryRepository');

class GalleryController extends CoreController {
    constructor() {
        super(galleryRepository);
    }

    async create(req, res) {
                try {
            req.body.userId = req.user.id;
            return await super.create(req, res);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async findAllByGallerist(req, res) {
        try {
            const galleries = await galleryRepository.getGalleryByGallerist(req.query.gallerist)
            return res.status(200).json(galleries)
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

}

module.exports = new GalleryController();
