'use strict';
const timestamps = require('../../utils/timestampsModel')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	Role.init({
		label: DataTypes.STRING,
		...timestamps
	},
		{
		sequelize,
		modelName: 'Role',
	});
	return Role;
};