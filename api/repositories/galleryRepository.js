const { Gallery, User } = require("../../db/models");
const CoreRepository = require('./coreRepository');

class GalleryRepository extends CoreRepository {
  constructor() {
    super(Gallery);
  }

    async getGalleryByGallerist(galleristId) {
        try {
            return await this.model.findAll(
                {
                    where: {
                        userId: galleristId
                    }
                }
            )
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new GalleryRepository();