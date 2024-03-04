"use strict";

const moment = require("moment");
const {faker} = require("@faker-js/faker");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const exhibitions = [];

		const galleries = await queryInterface.sequelize.query('SELECT id FROM "Galleries";');
		const galleryIds = galleries[0].map(gallery => gallery.id);

		for (let i = 0; i < 10; i++) {

			const startDate = moment().add(Math.floor(Math.random() * 90), 'days').toDate();
			const endDate = moment(startDate).add(Math.floor(Math.random() * 7) + 7, 'days').toDate();

			exhibitions.push({
				name: `Exhibition ${i + 1}`,
				start_date: startDate,
				end_date: endDate,
				gallery_id: galleryIds[Math.floor(Math.random() * galleries.length)],
				description: faker.lorem.sentences(),
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert('Exhibitions', exhibitions, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Exhibitions', null, {});
	},
};
