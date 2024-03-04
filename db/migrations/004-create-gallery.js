'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Galleries', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			image: {
				type: Sequelize.STRING
			},
			road: {
				type: Sequelize.STRING
			},
			zipcode: {
				type: Sequelize.STRING
			},
			city: {
				type: Sequelize.STRING
			},
			country: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				field: 'user_id'
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
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Galleries');
	}
};