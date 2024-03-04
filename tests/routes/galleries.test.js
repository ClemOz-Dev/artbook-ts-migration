const request = require("supertest");
const { expect, describe, it } = require("@jest/globals");
const app = require("../../api/app");
const { Gallery } = require("../../api/models");

/**
 * GET /API/GALLERIES
 */
describe("Test de la route api GET /galleries", () => {
  it("should return Ok", async () => {
    const response = await request(app).get("/api/galleries");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

/**
 * GET /API/GALLERIES/:id
 */
describe("Test de la route api GET /galleries", () => {
  it("should return status code 404", async () => {
    const response = await request(app).get("/api/galleries/-1");
    expect(response.status).toBe(404);
  });

  it("should return 200", async () => {
    const response = await request(app).get("/api/galleries/1");
    expect(response.status).toBe(200);
  });

  it("should return a Gallery", async () => {
    const response = await request(app).get("/api/galleries/1");
    const galleryInstance = await Gallery.build(response.body);
    expect(galleryInstance instanceof Gallery).toBe(true);
  });
});
