const jwt = require("jsonwebtoken");
const httpMocks = require("node-mocks-http");
const { authMiddleware } = require("../../api/middlewares/authMiddleware");
const dotenv = require("dotenv");

dotenv.config();

jest.mock("jsonwebtoken");
jest.mock("../../api/repositories/userRepository");
const userRepository = require("../../api/repositories/userRepository");

describe("authMiddleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: "Token non fourni. Authentification requise.",
    });
  });

  it("should return 401 if token is invalid", () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(new Error("Token invalide."), null);
    });

    const req = httpMocks.createRequest({
      headers: {
        Authorization: "Bearer fakeToken",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401); // Changed from 403 to 401
    expect(res._getJSONData()).toEqual({ message: "Token JWT invalide." }); // Adjust the message
  });

  it("should call next if token is valid", async () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(null, { userId: 1 });
    });

    // Mock the findById method from userRepository
    userRepository.findById.mockResolvedValue({ id: 1 });

    const req = httpMocks.createRequest({
      headers: {
        Authorization: "Bearer validToken",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: 1 });
    expect(next).toHaveBeenCalled();
  });
});
