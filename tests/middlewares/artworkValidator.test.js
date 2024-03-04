const {describe, it, expect} = require("@jest/globals");
const {
    validateArtworkUpdate,
    validateArtworkCreate
} = require("../../api/middlewares/validators/artwork");

/**
 *
 * UPDATE VALIDATOR
 *
 */
describe('validateArtworkUpdate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                name: "Artwork Name",
                image: "12345",
                description: "Description",
                categoryId: 1
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateArtworkUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should pass with just one parameter', async () => {
        const req = {
            body: {
                name: "Artwork Name"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateArtworkUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with invalid category', async () => {
        const req = {
            body: {
                name: "Artwork Name",
                image: "12345",
                description: "Description",
                categoryId: "invalid_category"
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateArtworkUpdate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["La catégorie doit être un nombre"]
        });
        expect(next).not.toHaveBeenCalled();
    });

    // Add more tests for other validation cases.
});


/**
 *
 * CREATE VALIDATOR
 *
 */
describe('validateArtworkCreate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                name: "Artwork Name",
                image: "12345",
                description: "Description",
                categoryId: 1
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateArtworkCreate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with missing name', async () => {
        const req = {
            body: {
                image: "12345",
                description: "Description",
                categoryId: 1
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateArtworkCreate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["Le nom doit être une chaîne de caractères", "Nom requis"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});
