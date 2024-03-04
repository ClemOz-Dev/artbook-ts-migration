import {
    Model,
    DataTypes,
    Association,
    Optional,
    Sequelize,
} from 'sequelize';
import {Role} from './role'; // Assurez-vous d'avoir un fichier de modèle Role.ts
import Artwork from './artwork';
import jwt from 'jsonwebtoken';
import {UserAttributes} from "../../api/models/UserAttributes";


interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;
    public firstName!: string;
    public lastName!: string;
    public birthdate!: string;
    public nationality!: string;
    public description!: string;
    public image!: string;
    public resetPasswordToken!: string;

    public getResetPasswordToken!: (id: number) => string;

    public readonly role?: Role;
    public readonly artworks?: Artwork[];

    static associations: {
        role: Association<User, Role>;
        artworks: Association<User, Artwork>;
    };

    static associate(models: any) {
        User.belongsTo(models.Role, {foreignKey: 'roleId', as: 'role'});
        User.hasMany(models.Artwork, {foreignKey: 'userId', as: 'artworks'});
    }

}

export const initUser = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleId: {
                type: DataTypes.INTEGER,
                field: 'role_id',
            },
            firstName: {
                type: DataTypes.STRING,
                field: 'first_name',
            },
            lastName: {
                type: DataTypes.STRING,
                field: 'last_name',
            },
            birthdate: DataTypes.DATEONLY,
            nationality: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
            resetPasswordToken: {
                type: DataTypes.STRING,
                field: 'reset_password_token',
            },
            createdAt: '',
            updatedAt: ''
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
        }
    );
    return User;
};

User.prototype.getResetPasswordToken = function (this: User, id: number): string {
    const token = jwt.sign({userId: id}, process.env.SECRET_KEY as string);
    this.resetPasswordToken = token;
    return token;
};

export default User;
