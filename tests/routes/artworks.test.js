const request = require("supertest");
const app = require("../../api/app");

describe("Artworks Routes", () => {
  // Test for GET all artworks
  it("should return 200 OK for getting all artworks", async () => {
    const response = await request(app).get("/api/artworks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test for GET artwork by ID
  it("should return 200 OK when an artwork is found", async () => {
    const id = 1; // replace with an ID that exists in your database
    const response = await request(app).get(`/api/artworks/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  it("should return 404 Not Found when an artwork is not found", async () => {
    const id = -1; // replace with an ID that doesn't exist in your database
    const response = await request(app).get(`/api/artworks/${id}`);
    expect(response.status).toBe(404);
  });

  // Additional tests for POST, PUT, and DELETE can be added here, particularly
  // if you wish to test authentication and role-based access controls.
});
