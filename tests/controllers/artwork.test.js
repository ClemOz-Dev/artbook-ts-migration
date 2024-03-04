const request = require("supertest");
const app = require("../../api/app");
const { expect, describe, it } = require("@jest/globals");
const jwt = require("jsonwebtoken");

/**
 * ARTWORKCONTROLLER - CREATE
 */
describe("ArtworkController - Create tests", () => {
  const path = "/api/artworks";
  const userArtist = { id: 2 };
  const token = jwt.sign({ userId: userArtist.id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  it("should create artwork with valid data", async () => {
    const artworkData = {
      name: "New Artwork",
      image: "Fake img",
      description: "Fake description",
      categoryId: 1,
    };

    const response = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send(artworkData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("userId", 2);
  });

  it("should return an error with invalid data", async () => {
    const invalidArtworkData = {
      image: "Fake img",
      description: "Fake description",
      categoryId: 1,
    };

    const response = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send(invalidArtworkData);

    expect(response.status).toBe(422);
  });
});

/**
 * ARTWORKCONTROLLER - getArtworkById
 */
describe("ArtworkController - getArtworkById tests", () => {
  const path = "/api/artworks/:id";

  it("should return artwork by ID", async () => {
    const artworkId = 1;

    const response = await request(app).get(path.replace(":id", artworkId));

    expect(response.status).toBe(200);
  });

  it("should return an error for non-existent artwork", async () => {
    const nonExistentArtworkId = 9999;

    const response = await request(app).get(
      path.replace(":id", nonExistentArtworkId)
    );

    expect(response.status).toBe(404);
  });
});
