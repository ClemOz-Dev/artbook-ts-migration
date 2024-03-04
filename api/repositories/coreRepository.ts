import {Model, ModelStatic, CreationAttributes, CreateOptions} from 'sequelize';

export class CoreRepository<TModel extends Model> {
    model: ModelStatic<TModel>;

    constructor(model: ModelStatic<TModel>) {
        this.model = model;
    }

    async create(data: CreationAttributes<TModel>, options?: CreateOptions): Promise<TModel> {
        return this.model.create(data, options);
    }

    async findAll(): Promise<TModel[]> {
        return this.model.findAll();
    }

    async findById(id: number): Promise<TModel | null> {
        return this.model.findByPk(id);
    }

    async update(id: number, data: Partial<TModel>): Promise<TModel> {
        const entity = await this.findById(id);
        if (!entity) {
            throw new Error('Entity not found');
        }
        return entity.update(data);
    }

    async delete(id: number): Promise<void> {
        const entity = await this.findById(id);
        if (!entity) {
            throw new Error('Entity not found');
        }
        await entity.destroy();
    }
}