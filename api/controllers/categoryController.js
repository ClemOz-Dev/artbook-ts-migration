const CoreController = require('./coreController')
const categoryRepository = require('../repositories/categoryRepository')
class CategoryController extends CoreController {
  constructor() {
    super(categoryRepository);
  }
  async findAll(req, res) {
    try {
      const categories = await categoryRepository.findAll();

            res.status(200).json(categories);
        } catch (error) {

            console.error(error);
            res.status(500).json({error: 'Une erreur s\'est produite lors de la récupération de la liste des categories'});
        }
    }
}

module.exports = new CategoryController();