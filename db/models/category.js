'use strict';
const {Model} = require('sequelize');
const timestamps = require('../../utils/timestampsModel')

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.hasMany(models.Artwork, {
				foreignKey: 'category_id',
				as: 'artworks',
			});
		}
	}

	Category.init(
		{
			label: DataTypes.STRING,
			...timestamps
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};
