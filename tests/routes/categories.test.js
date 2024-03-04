const request = require("supertest");
const app = require("../../api/app");

describe("Categories Routes", () => {
  // Test for GET categories
  it("should return 200 OK and a list of categories", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
