const {describe, it, expect} = require("@jest/globals");
const {
    validateGalleryCreate,
    validateGalleryUpdate
} = require("../../api/middlewares/validators/gallery");


/**
 *
 * CREATE VALIDATOR
 *
 */
describe('validateGalleryCreate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                road: "Sample Road",
                zipcode: "12345",
                city: "Sample City",
                country: "Sample Country",
                image: "12345",
                description: "Sample Description",
                user_id: 1
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateGalleryCreate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with missing road', async () => {
        const req = {
            body: {
                zipcode: "12345",
                city: "Sample City",
                country: "Sample Country",
                image: "12345",
                description: "Sample Description",
                user_id: 1
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateGalleryCreate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["La route doit être une chaîne de caractères", "Voie requise"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});

/**
 *
 * UPDATE VALIDATOR
 *
 */
describe('validateGalleryUpdate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                road: "Sample Road",
                zipcode: "12345",
                city: "Sample City",
                country: "Sample Country",
                image: "12345",
                description: "Sample Description",
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateGalleryUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should pass with just one parameter', async () => {
        const req = {
            body: {
                road: "Sample Road"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateGalleryUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with invalid zipcode', async () => {
        const req = {
            body: {
                road: "Sample Road",
                zipcode: 123,
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateGalleryUpdate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["Le code postal doit être une chaîne de caractères"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});
