const CoreController = require('./coreController');
const exhibitionRepository = require('../repositories/exhibitionRepository');
const exhibitionHasArtworkRepository = require('../repositories/exhibitionHasArtworkRepository');

class ExhibitionController extends CoreController {
    constructor() {
        super(exhibitionRepository);
    }

    async findAll(req, res) {
        try {
            const entities = await this.repository.findAll(req.query.gallery);
            return res.status(200).json(entities);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async getExhibition(req, res) {
        try {
            const exhibitionId = parseInt(req.params.id);
            const exhibitions = await exhibitionRepository.getExhibitionWithGallerie(exhibitionId)
            if (!exhibitions) {
                return res.status(404).json({error: 'Exposition non trouvée'})
            }
            return res.status(200).json(exhibitions);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async create(req, res) {
        const data = req.body
        const artworks = req.body.artworks
        try {

            const exhibition = await exhibitionRepository.create(data);
            for (const artworkData of artworks) {
                const exhibitionHasArtworkData = {
                    exhibition_id: exhibition.id,
                    artwork_id: artworkData,
                };
                await exhibitionHasArtworkRepository.create(exhibitionHasArtworkData);
            }

            return res.status(201).json(exhibition);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new ExhibitionController();