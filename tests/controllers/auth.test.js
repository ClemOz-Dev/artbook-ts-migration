const request = require('supertest');
const app = require('../../api/app');
const {expect, describe, it} = require('@jest/globals');
const userFactory = require("../../db/factories/userFactory");

/**
 * AUTHCONTROLLER - LOGIN
 */
describe('Login tests', () => {
    const path = '/auth/login'

    it('should return 401 with unknown user', async () => {
        const user = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        const response = await request(app).post(path).send(user);
        expect(response.status).toBe(401);
    });

    it('should return 200 with validate token', async () => {
        const user = {
            email: 'dave@loper.com',
            password: 'Txp73N!B',
        };

        const response = await request(app).post(path).send(user);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });


});


/**
 * AUTHCONTROLLER - REGISTER
 */
describe('Register tests', () => {
    const path = '/auth/register';

    it('should return 422 with uncompleted body', async () => {
        const incompleteUser = {
            email: 'john@doe.com',
            password: 'Password123!',
            lastName: "Doe",
            roleId: 1,
        };

        const response = await request(app).post(path).send(incompleteUser);
        expect(response.status).toBe(422);
    });

    it('should return 409 with already known user', async () => {
        const existingUser = {
            email: 'dave@loper.com',
            password: 'Password123!',
            firstName: "John",
            lastName: "Doe",
            roleId: 1,
        };

        const response = await request(app).post(path).send(existingUser);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error', 'Cet e-mail est déjà pris.');
    });

    it('should return 401 with new created user', async () => {
        const newUser = await userFactory.generateUser();
        const serializedUser = {};

        for (const property in newUser) {
            const newPropertyName = property.replace(/_(\w)/g, (match, letter) => letter.toUpperCase());
            serializedUser[newPropertyName] = newUser[property];
        }

        const response = await request(app).post(path).send(serializedUser);
        expect(response.status).toBe(201);
    });

});

