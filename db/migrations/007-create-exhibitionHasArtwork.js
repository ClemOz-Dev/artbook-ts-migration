'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ExhibitionHasArtworks', {
			exhibitionId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Exhibitions',
					key: 'id',
				},
				field: 'exhibition_id'
			},
			artworkId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Artworks',
					key: 'id',
				},
				field: 'artwork_id'
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
    await queryInterface.dropTable('ExhibitionHasArtworks');
  }

};
