"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
				field: 'role_id'
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'first_name'
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'last_name'
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			birthdate: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			nationality: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			resetPasswordToken: {
				type: Sequelize.STRING,
				allowNull: true,
				field: 'reset_password_token'
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
		await queryInterface.dropTable("Users");
	},
};
