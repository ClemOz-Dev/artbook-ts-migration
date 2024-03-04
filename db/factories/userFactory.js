const {faker} = require("@faker-js/faker");
const bcrypt = require("bcrypt");

let userIdCounter = 1;

async function generateUser() {

    const roleIds = [1, 2, 3];
    const randomIndex = (userIdCounter - 1) % roleIds.length;
    userIdCounter++;
    const roleId = roleIds[randomIndex];

    return {
        email: faker.internet.email(),
        password: await bcrypt.hash("Password123!", 12),
        role_id: roleId,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        description: faker.lorem.sentence(),
        nationality: faker.location.country(),
        birthdate: faker.date.birthdate(),
        image: faker.image.avatar(),
        reset_password_token: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date(),
    };
}

module.exports = {
    generateUser,
};

