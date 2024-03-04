'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1');

		await queryInterface.bulkInsert('Categories', [
			{
				label: 'Painting',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				label: 'Sculpture',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				label: 'Photography',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				label: 'Digital Art',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
