const {
  validateLogin,
  validateRegister,
} = require("../../api/middlewares/validators/auth");
const { validationResult } = require("express-validator");
const httpMocks = require("node-mocks-http");

const runValidation = async (validator, req, res) => {
  await validator(req, res, () => {});
  return validationResult(req);
};

describe("Auth Validators", () => {
  test("validateLogin should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        email: "test@example.com",
        password: "password123",
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateLogin, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateLogin should fail with missing fields", async () => {
    const req = httpMocks.createRequest({
      body: { email: "test@example.com" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateLogin, req, res);
    expect(result.isEmpty()).toBe(false);
  });

  test("validateRegister should pass with correct fields", async () => {
    const req = httpMocks.createRequest({
      body: {
        email: "test@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        roleId: 1,
      },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateRegister, req, res);
    expect(result.isEmpty()).toBe(true);
  });

  test("validateRegister should fail with missing fields", async () => {
    const req = httpMocks.createRequest({
      body: { email: "test@example.com" },
    });
    const res = httpMocks.createResponse();

    const result = await runValidation(validateRegister, req, res);
    expect(result.isEmpty()).toBe(false);
  });
});
