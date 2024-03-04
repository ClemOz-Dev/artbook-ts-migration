const {
  validateGalleryCreate,
  validateGalleryUpdate,
} = require("../../api/middlewares/validators/gallery");
const { validationResult } = require("express-validator");
const httpMocks = require("node-mocks-http");

const runValidation = async (validator, req, res) => {
  await validator(req, res, () => {});
  return validationResult(req);
};

describe("Gallery Validators", () => {
  test("validateGalleryCreate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        road: "Main St",
        zipcode: "12345",
        city: "Anytown",
        country: "France",
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateGalleryCreate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateGalleryCreate should fail with missing fields", async () => {
    const req = httpMocks.createRequest({
      body: { road: "Main St" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateGalleryCreate, req, res);
    expect(result.isEmpty()).toBe(false);
  });

  test("validateGalleryUpdate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        road: "Updated St",
        zipcode: "67890",
        city: "Updated City",
        country: "Updated Country",
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateGalleryUpdate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateGalleryUpdate should pass when fields are missing", async () => {
    const req = httpMocks.createRequest({
      body: { road: "Updated St" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateGalleryUpdate, req, res);
    expect(result.isEmpty()).toBe(true);
  });
});
