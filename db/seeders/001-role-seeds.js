'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER SEQUENCE "Roles_id_seq" RESTART WITH 1');

		await queryInterface.bulkInsert('Roles', [
			{
				label: 'Collector',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				label: 'Gallerist',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				label: 'Artist',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Roles', null, {});
	},
};
