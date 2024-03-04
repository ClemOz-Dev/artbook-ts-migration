import {Model, DataTypes, Sequelize} from 'sequelize';
import {Category} from './category'; // Assurez-vous d'avoir un fichier de modèle Category.ts
import User from './user';
import {Exhibition} from './exhibition'; // Assurez-vous d'avoir un fichier de modèle Exhibition.ts

class Artwork extends Model {
    public id!: number;
    public name!: string;
    public image!: string;
    public description!: string;
    public categoryId!: number;
    public userId!: number;
    public available!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any): void {
        Artwork.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });
        Artwork.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'artist',
        });
        Artwork.belongsToMany(models.Exhibition, {
            through: 'exhibition_has_artworks',
            as: 'exhibitions',
            foreignKey: 'artwork_id'
        });
    }
}

export const initArtwork = (sequelize: Sequelize): typeof Artwork => {
    Artwork.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'category_id'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id'
            },
            available: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        },
        {
            sequelize,
            modelName: 'Artwork',
            tableName: 'artworks',
            timestamps: true,
        }
    );
    return Artwork;
};

export default Artwork;
