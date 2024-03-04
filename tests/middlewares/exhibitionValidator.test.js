const {describe, it, expect} = require("@jest/globals");
const {
    validateExhibitionCreate,
    validateExhibitionUpdate
} = require("../../api/middlewares/validators/exhibition");


/**
 *
 * CREATE VALIDATOR
 *
 */
describe('validateExhibitionCreate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                name: "Sample Exhibition",
                description: "Sample Description",
                gallery_id: 1,
                start_date: "2023-01-01",
                end_date: "2023-02-01"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateExhibitionCreate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with missing name', async () => {
        const req = {
            body: {
                description: "Sample Description",
                gallery_id: 1,
                start_date: "2023-01-01",
                end_date: "2023-02-01"
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateExhibitionCreate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["Le nom de l'exposition doit être une chaîne de caractères", "Nom requis"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});


/**
 *
 * UPDATE VALIDATOR
 *
 */
describe('validateExhibitionUpdate Tests', () => {
    it('should pass with all parameters', async () => {
        const req = {
            body: {
                name: "Updated Exhibition",
                description: "Updated Description",
                gallery_id: 1,
                start_date: "2023-01-01",
                end_date: "2023-02-01"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateExhibitionUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should pass with just one parameter', async () => {
        const req = {
            body: {
                name: "Updated Exhibition"
            }
        };
        const res = {json: jest.fn()};
        const next = jest.fn();

        await validateExhibitionUpdate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with invalid gallery_id', async () => {
        const req = {
            body: {
                gallery_id: "invalid_gallery"
            }
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        await validateExhibitionUpdate(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            errors: ["L'ID de la galerie associée doit être un nombre"]
        });
        expect(next).not.toHaveBeenCalled();
    });

});
