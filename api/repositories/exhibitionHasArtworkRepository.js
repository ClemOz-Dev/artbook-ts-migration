const CoreRepository = require('./coreRepository');
const { exhibition_has_artworks } = require("../../db/models");

class ExhibitionHasArtworkRepository extends CoreRepository {
    constructor() {
        super(exhibition_has_artworks);
    }
}

module.exports = new ExhibitionHasArtworkRepository();