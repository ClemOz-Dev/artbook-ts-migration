// validateArtwork.test.js

const {
  validateArtworkUpdate,
  validateArtworkCreate,
} = require("../../api/middlewares/validators/artwork");
const { validationResult } = require("express-validator");
const httpMocks = require("node-mocks-http");

const runValidation = async (validator, req, res) => {
  await validator(req, res, () => {});
  return validationResult(req);
};

describe("Artwork Validators", () => {
  test("validateArtworkUpdate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Artwork 1",
        image: "image.png",
        description: "A great artwork",
        categoryId: 1,
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateArtworkUpdate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateArtworkUpdate should fail with incorrect fields", async () => {
    const req = httpMocks.createRequest({
      body: { name: 123, image: 456, description: 789, categoryId: "string" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateArtworkUpdate, req, res);
    expect(result.isEmpty()).toBe(false);
  });

  test("validateArtworkCreate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Artwork 1",
        image: "image.png",
        description: "A great artwork",
        categoryId: 1,
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateArtworkCreate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateArtworkCreate should fail with missing fields", async () => {
    const req = httpMocks.createRequest({
      body: { name: "Artwork 1" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateArtworkCreate, req, res);
    expect(result.isEmpty()).toBe(false);
  });
});
