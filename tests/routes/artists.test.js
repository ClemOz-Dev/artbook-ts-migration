const request = require("supertest");
const app = require("../../api/app");

describe("Artists Routes", () => {
  // Test for GET all artists
  it("should return 200 OK for getting all artists", async () => {
    const response = await request(app).get("/api/artists");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test for GET artist by ID
  // it("should return 200 OK when an artist is found", async () => {
  //   const id = 1; // replace with an ID that exists in your database
  //   const response = await request(app).get(`/api/artists/${id}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("id", id);
  // });

  it("should return 404 Not Found when an artist is not found", async () => {
    const id = -1; // replace with an ID that does not exist in your database
    const response = await request(app).get(`/api/artists/${id}`);
    expect(response.status).toBe(404);
  });
});
