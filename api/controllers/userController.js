const CoreController = require('./coreController');
const userRepository = require('../repositories/userRepository');

class UserController extends CoreController {
    constructor() {
        super(userRepository);
    }

    async findMe(req, res) {
        try {
            const user = await userRepository.findById(req.user.id);
            if (!user) {
                return res.status(404).json({message: 'Utilisateur non trouvé.'});
            }

            const userResponse = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                description: user.description,
                roleId: user.roleId,
                birthdate: user.birthdate,
                email: user.email
            };

            res.status(200).json(userResponse);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Une erreur s\'est produite lors de la récupération de l\'utilisateur.'});
        }
    }

    async getAllArtists(req, res) {
        const limit = req.query.limit || 10
        const offset = req.query.offset || 0
        const withArtworks = req.query.artworks
        try {
            const artists = withArtworks ?
                await userRepository.getArtistsWithArtworks(limit, offset)
                : await userRepository.getArtists(limit, offset);
            return res.status(200).json(artists);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }


    async getArtistById(req, res) {
        try {
            const artistId = parseInt(req.params.id, 10);
            const artist = await userRepository.getArtistByIdWithArtworks(artistId);

            if (!artist) {
                return res.status(404).json({error: 'Artiste non trouvé'});
            }

            return res.status(200).json(artist);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new UserController();
