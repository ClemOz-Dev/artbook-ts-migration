const logger = require('../../config/winston');

class CoreController {
    constructor(repository) {
        this.repository = repository;
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req, res) {
        try {
            const entity = await this.repository.create(req.body);
            return res.status(201).json(entity);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const entities = await this.repository.findAll();
            return res.status(200).json(entities);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async findById(req, res) {
        const {id} = req.params;
        try {
            const entity = await this.repository.findById(id);

            if (!entity) {
                return res.status(404).json({error: "Entity not found"});
            }
            return res.status(200).json(entity);
        } catch (error) {
            // logger.error(error);
            return res.status(500).json({error: error.message});
        }
    }

    async update(req, res) {
        const {id} = req.params;
        try {
            const updatedEntity = await this.repository.update(id, req.body);
            if (!updatedEntity) {
                return res.status(404).json({error: "Entity not found"});
            }
            return res.status(200).json(updatedEntity);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        try {
            const deletedEntity = await this.repository.delete(id);
            if (!deletedEntity) {
                return res.status(404).json({error: "Entity not found"});
            }
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = CoreController;
