'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const exhibitionHasArtworks = [];

		const exhibitions = await queryInterface.sequelize.query('SELECT id FROM "Exhibitions";');
		const exhibitionIds = exhibitions[0].map(exhibition => exhibition.id);

		const artworks = await queryInterface.sequelize.query('SELECT id FROM "Artworks";');
		const artworkIds = artworks[0].map(artwork => artwork.id);


		for (let i = 0; i < 20; i++) {

			exhibitionHasArtworks.push({
				exhibition_id: exhibitionIds[Math.floor(Math.random() * exhibitionIds.length)],
				artwork_id: artworkIds[Math.floor(Math.random() * artworkIds.length)],
				created_at: new Date(),
				updated_at: new Date(),
			});
		}

		await queryInterface.bulkInsert('ExhibitionHasArtworks', exhibitionHasArtworks, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('ExhibitionHasArtworks', null, {});
	},
};
