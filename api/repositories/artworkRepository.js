const { Artwork, Category, User, Exhibition } = require("../../db/models");
const CoreRepository = require('./coreRepository');

class ArtworkRepository extends CoreRepository {
  constructor() {
    super(Artwork);
  }
  async getArtworkWithCategory(id) {
    try {
      return await this.model.findByPk(id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'label']
        }, {
          model: User,
          as: 'artist',
          attributes: ['id', 'firstName','lastName', 'nationality']
        }],
        attributes: ['id', 'name', 'description', 'image']
      })
    } catch (error) {
      throw error;
    }
  }

  async getArtworksWithArtistName() {
    try {
      return await this.model.findAll({
        include: [{
          model: User,
          as: 'artist',
          attributes: ['id', 'first_name', 'last_name'],
        }]
      });
    } catch (error) {
      throw error;
    }}
    
  async getArtworksByCategory(categoryId) {
    try {
      return await this.model.findAll({
        where: {
          category_id: categoryId
        },
        attributes: ['id', 'name', 'description', 'image'],
        limit:10
      });
    } catch (error) {
      throw error;
    }
  }


    async getArtworksByArtist(artistId) {
        try {
            return await this.model.findAll(
                {
                    where: {
                        userId: artistId
                    }
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async getArtworksInExhibition() {
      try {
        return await this.model.findAll({
          include: [
            {
              model: Exhibition,
              as: 'exhibitions',
            }
          ]
        });
      } catch (error) {
        throw error;
      }
    }
}

module.exports = new ArtworkRepository();