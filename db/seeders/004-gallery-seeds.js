'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER SEQUENCE "Galleries_id_seq" RESTART WITH 1');

		const usersGallerists = await queryInterface.sequelize.query('SELECT id FROM "Users" WHERE role_id = 2;');
		const userIds = usersGallerists[0].map(user => user.id);

		if (userIds.length === 0) {
			throw new Error("Aucun utilisateur avec un rôle de galeriste n'a été trouvé."
			);
		}

		const galleriesData = [];
		for (let i = 0; i < 4; i++) {
			galleriesData.push({
				image: faker.image.urlPicsumPhotos(),
				road: faker.location.streetAddress(),
				zipcode: faker.location.zipCode(),
				city: faker.location.city(),
				country: faker.location.country(),
				description: faker.lorem.sentence(),
				user_id: userIds[Math.floor(Math.random() * userIds.length)],
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert('Galleries', galleriesData);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Galleries', null, {});
	},
};
