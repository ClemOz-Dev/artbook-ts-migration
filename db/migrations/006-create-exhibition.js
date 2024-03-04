'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Exhibitions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			galleryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Galleries',
					key: 'id',
				},
				field: 'gallery_id'
			},
			startDate: {
				type: Sequelize.DATE,
				field: 'start_date'
			},
			endDate: {
				type: Sequelize.DATE,
				field: 'end_date'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'created_at'
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'updated_at'
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Exhibitions');
	},
};
