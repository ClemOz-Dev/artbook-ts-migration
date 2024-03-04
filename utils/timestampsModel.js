const { DataTypes } = require('sequelize');

const timestamps = {
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: new Date(),
		field: 'created_at',
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: new Date(),
		field: 'updated_at',
	},
};

module.exports = timestamps;
