const {describe, it, expect} = require("@jest/globals");
const {validateUserUpdate} = require("../../api/middlewares/validators/user");

/**
 *
 * UPDATE VALIDATOR
 *
 */
describe('validateUserUpdate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                description: "Artist",
                image: "12345",
                birthdate: "1990-01-01",
                nationality: "France"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateUserUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should pass with just one parameter', async () => {
        const req = {
            body: {
                description: "Artist",
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateUserUpdate(req, res, next);
        expect(next).toHaveBeenCalled();
    });


    it('should fail with invalid date', async () => {
        const req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                description: "Artist",
                image: "12345",
                birthdate: "invalid_date",
                nationality: "USA"
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateUserUpdate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["La date d'anniversaire doit être une date valide"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});
