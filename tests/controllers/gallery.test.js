const request = require("supertest");
const app = require("../../api/app");
const { expect, describe, it } = require("@jest/globals");
const jwt = require("jsonwebtoken");

/**
 * GALLERYCONTROLLER - CREATE
 */
describe("GalleryController - Create tests", () => {
  const path = "/api/galleries";
  const userGallerist = { id: 3 };
  const token = jwt.sign({ userId: userGallerist.id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  it("should create gallery with valid data", async () => {
    const galleryData = {
      image: "Fake img",
      description: "Fake description",
      road: "Fake road",
      zipcode: "Fake zipcode",
      city: "Fake city",
      country: "Fake country",
    };

    const response = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send(galleryData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("image", "Fake img");
    expect(response.body).toHaveProperty("userId", 3);
  });

  it("should return an error with invalid data", async () => {
    const invalidGalleryData = {
      image: "Fake img",
      description: "Fake description",
    };

    const response = await request(app)
      .post(path)
      .set("authorization", `Bearer ${token}`)
      .send(invalidGalleryData);
    expect(response.status).toBe(422);
  });
});

/**
 * GALLERYCONTROLLER - getGalleryById
 */
describe("GalleryController - getGalleryById tests", () => {
  const path = "/api/galleries/:id";

  it("should return gallery by ID", async () => {
    const galleryId = 1;

    const response = await request(app).get(path.replace(":id", galleryId));

    expect(response.status).toBe(200);
  });

  it("should return an error for non-existent gallery", async () => {
    const nonExistentGalleryId = 9999;
    const response = await request(app).get(
      path.replace(":id", nonExistentGalleryId)
    );
    expect(response.status).toBe(404);
  });
});
