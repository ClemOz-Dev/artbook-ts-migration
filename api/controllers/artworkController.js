const CoreController = require('./coreController');
const artworkRepository = require('../repositories/artworkRepository');

class ArtworkController extends CoreController {
    constructor() {
        super(artworkRepository);
    }

    async findAll(req, res) {

        try {
            const artworks = req.query.artist ?
                await artworkRepository.getArtworksByArtist(req.query.artist) :
                await artworkRepository.findAll();
            if (!artworks) {
                return res.status(404).json({error: 'Oeuvres non trouvés'})
            }
            return res.status(200).json(artworks)
        } catch (error) {
            return res.status(500).json({error: error.message});
        }


    }

    async getArtworkById(req, res) {
        try {
            const artworkId = parseInt(req.params.id);
            const artwork = await artworkRepository.getArtworkWithCategory(artworkId);

            if (!artwork) {
                return res.status(404).json({error: 'Oeuvre non trouvé'})
            }
            return res.status(200).json(artwork)
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async getArtworksByCategory(req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId);
            const artworks = await artworkRepository.getArtworksByCategory(categoryId);

            return res.status(200).json(artworks);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async create(req, res) {
        try {
            req.body.userId = req.user.id;
            return await super.create(req, res);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
	
	async getArtworksWithArtist(req, res) {
		try {
			const artworks = await artworkRepository.getArtworksWithArtistName();
			
			if (!artworks) {
				return res.status(404).json({error: 'Oeuvres avec nom d\'artiste non trouvées'})
			}
			return res.status(200).json(artworks)
		} catch (error) {
			return res.status(500).json({error: error.message});
		}
	}

    async getArtworksInExhibition(req, res) {
		try {
			const artworks = await artworkRepository.getArtworksInExhibition();
			
			if (!artworks) {
				return res.status(404).json({error: 'Oeuvres avec nom d\'artiste non trouvées'})
			}
			return res.status(200).json(artworks)
		} catch (error) {
			return res.status(500).json({error: error.message});
		}
	}
}

module.exports = new ArtworkController();
