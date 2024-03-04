const {describe, it, expect} = require("@jest/globals");
const {isGallerist, isArtist} = require("../../api/middlewares/roleMiddleware");


describe('roleMiddlewares Tests', () => {
    it('should pass with Artist', () => {
        const req = {user: {roleId: 3}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        isArtist(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with Artist', () => {
        const req = {user: {roleId: 2}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        isArtist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({message: 'Accès exclusivement réservé aux artistes.'});
        expect(next).not.toHaveBeenCalled();
    });

    it('should pass with Gallerist', () => {
        const req = {user: {roleId: 2}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        isGallerist(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should fail with Gallerist', () => {
        const req = {user: {roleId: 3}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        const next = jest.fn();

        isGallerist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({message: 'Accès exclusivement réservé aux galeristes.'});
        expect(next).not.toHaveBeenCalled();
    });
});