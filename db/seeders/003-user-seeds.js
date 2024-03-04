"use strict";
const bcrypt = require("bcrypt");
const {faker} = require("@faker-js/faker");
const userFactory = require("../factories/userFactory");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(
            'ALTER SEQUENCE "Users_id_seq" RESTART WITH 1'
        );

        const usersData = [];

        // test users
        usersData.push({
            email: "dave@loper.com",
            password: await bcrypt.hash("Txp73N!B", 12),
            role_id: 1,
            first_name: "Dave",
            last_name: "Loper",
            description: faker.lorem.sentence(),
            nationality: faker.location.country(),
            birthdate: faker.date.birthdate(),
            image: faker.image.avatar(),
            reset_password_token: faker.lorem.sentence(),
            created_at: new Date(),
            updated_at: new Date(),
        })

           usersData.push({
            email: "artist@artist.com",
            password: await bcrypt.hash("Password123!", 12),
            role_id: 3,
            first_name: "Artist",
            last_name: "Test",
            description: faker.lorem.sentence(),
            nationality: faker.location.country(),
            birthdate: faker.date.birthdate(),
            image: faker.image.avatar(),
            reset_password_token: faker.lorem.sentence(),
            created_at: new Date(),
            updated_at: new Date(),
        })

           usersData.push({
            email: "gallerist@gallerist.com",
            password: await bcrypt.hash("Password123!", 12),
            role_id: 2,
            first_name: "Gallerist",
            last_name: "Test",
            description: faker.lorem.sentence(),
            nationality: faker.location.country(),
            birthdate: faker.date.birthdate(),
            image: faker.image.avatar(),
            reset_password_token: faker.lorem.sentence(),
            created_at: new Date(),
            updated_at: new Date(),
        })

        for (let i = 0; i < 50; i++) {
            usersData.push(await userFactory.generateUser());
        }
        await queryInterface.bulkInsert("Users", usersData);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
