'use strict';
const {faker} = require('@faker-js/faker')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER SEQUENCE "Artworks_id_seq" RESTART WITH 1');
		const artworks = [];

		const categories = await queryInterface.sequelize.query('SELECT id FROM "Categories";');
		const usersArtists = await queryInterface.sequelize.query('SELECT id FROM "Users" WHERE role_id = 3;');

		const userIds = usersArtists[0].map(user => user.id);
		const categoryIds = categories[0].map(category => category.id);

		for (let i = 0; i < 20; i++) {
			const randomCategory = categoryIds[Math.floor(Math.random() * categoryIds.length)];

			artworks.push({
				name: faker.lorem.sentence({max: 5, min: 2}),
				image: faker.image.urlPicsumPhotos(),
				description: faker.lorem.text(),
				category_id: randomCategory,
				user_id: userIds[Math.floor(Math.random() * userIds.length)],
				available: true,
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert('Artworks', artworks, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Artworks', null, {});
	},
};
