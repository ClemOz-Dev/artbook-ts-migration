// validateExhibition.test.js

const {
  validateExhibitionCreate,
  validateExhibitionUpdate,
} = require("../../api/middlewares/validators/exhibition");
const { validationResult } = require("express-validator");
const httpMocks = require("node-mocks-http");

const runValidation = async (validator, req, res) => {
  await validator(req, res, () => {});
  return validationResult(req);
};

describe("Exhibition Validators", () => {
  test("validateExhibitionCreate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Exhibition 1",
        description: "A great exhibition",
        gallery_id: 1,
        start_date: "2022-01-01",
        end_date: "2022-01-31",
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateExhibitionCreate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateExhibitionCreate should fail with missing fields", async () => {
    const req = httpMocks.createRequest({
      body: { name: "Exhibition 1" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateExhibitionCreate, req, res);
    expect(result.isEmpty()).toBe(false);
  });

  test("validateExhibitionUpdate should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        name: "Updated Exhibition",
        description: "An updated great exhibition",
        gallery_id: 2,
        start_date: "2022-02-01",
        end_date: "2022-02-28",
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateExhibitionUpdate, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateExhibitionUpdate should pass when fields are missing", async () => {
    const req = httpMocks.createRequest({
      body: { name: "Updated Exhibition" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateExhibitionUpdate, req, res);
    expect(result.isEmpty()).toBe(true);
  });
});
