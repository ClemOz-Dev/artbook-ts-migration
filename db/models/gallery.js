'use strict';
const timestamps = require('../../utils/timestampsModel')
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Gallery extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Gallery.belongsTo(models.User, {foreignKey: 'user_id'});
		}
	}

	Gallery.init({
		image: DataTypes.STRING,
		road: DataTypes.STRING,
		zipcode: DataTypes.STRING,
		city: DataTypes.STRING,
		country: DataTypes.STRING,
		description: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			field: 'user_id'
		},
		...timestamps
	}, {
		sequelize,
		modelName: 'Gallery',
	});
	return Gallery;
};