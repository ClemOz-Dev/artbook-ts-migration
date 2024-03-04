const request = require('supertest');
const app = require('../../api/app');
const {expect, describe, it} = require('@jest/globals');


/**
 * GET /API/USERS
 */
describe('Test de la route api GET /users', () => {
    it('should return status code 200', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});


/**
 * GET /API/USERS/:id
 */
describe('Test de la route api GET /users/id', () => {
    it('should return status code 404', async () => {
        const response = await request(app).get('/api/users/-1');
        expect(response.status).toBe(404);
    });


    it('should return status code 200', async () => {
        const response = await request(app).get('/api/users/1');
        expect(response.status).toBe(200);
    });

});
