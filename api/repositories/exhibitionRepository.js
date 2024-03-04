const {Exhibition, Gallery, Artwork, User} = require("../../db/models");
const CoreRepository = require('./coreRepository');

class ExhibitionRepository extends CoreRepository {
    constructor() {
        super(Exhibition);
    }

    async findAll(galleryId = null) {
        try {
            const queryOptions = {
                include: [
                    {
                        model: Gallery,
                        as: 'gallery',
                        attributes: ['id', 'image', 'road', 'zipcode', 'city', 'country', 'description', 'userId', 'created_at', 'updated_at']
                    },
                    {
                        model: Artwork,
                        as: 'artworks',
                        attributes: ['id', 'name', 'image', 'description', 'category_id', 'created_at', 'updated_at'],
                    }
                ],
            };

            if (galleryId) {
                queryOptions.where = {
                    '$gallery.id$': galleryId
                };
            }

            return await this.model.findAll(queryOptions);
        } catch (error) {
            throw error;
        }
    }


    async getExhibitionWithGallerie(id) {
        try {
            return await this.model.findByPk(id, {
                include: [
                    {
                        model: Artwork,
                        as: 'artworks',
                        attributes: ['id', 'name', 'image', 'description', 'category_id', 'created_at', 'updated_at'],
                        include: [
                            {
                                model: User,
                                as: 'artist',
                                attributes: ['id', 'firstName', 'lastName', 'birthdate', 'nationality', 'image', 'description'],
                            }
                        ]
                    },
                    {
                        model: Gallery,
                        as: 'gallery',
                        attributes: ['id', 'image', 'road', 'zipcode', 'city', 'country', 'description', 'userId', 'created_at', 'updated_at']
                    },
                ],

            });

        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ExhibitionRepository();