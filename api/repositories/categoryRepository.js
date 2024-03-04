const { Category, Artwork } = require("../../db/models");
const CoreRepository = require('./coreRepository');

class CategoryRepository extends CoreRepository {
	constructor() {
		super(Category);
	}

}

module.exports = new CategoryRepository();
