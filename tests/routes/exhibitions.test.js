// const request = require("supertest");
// const app = require("../../api/app");
// const { expect, describe, it } = require("@jest/globals");
// const { Exhibition } = require("../../api/models");
//
// describe("Exhibition Routes", () => {
//   const payload = {
//     name: "Art Show 2023",
//     start_date: "2023-11-01",
//     end_date: "2023-11-30",
//     gallery_id: 1,
//   };
//
//   it("should return all exhibitions with 200 OK", async () => {
//     const response = await request(app).get("/api/exhibitions");
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });
//
//   it("should return the exhibition with ID", async () => {
//     const response = await request(app).get("/api/exhibitions/1");
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body.id).toBe(1);
//   });
//
//   it("should create a new exhibition and return 201", async () => {
//     const response = await request(app).post("/api/exhibitions").send(payload);
//     expect(response.status).toBe(201);
//     expect(response.body.name).toBe(payload.name);
//   });
//
//   it("should return 201 for a new exhibition", async () => {
//     const newPayload = {
//       name: "New Exhibition",
//       start_date: "2024-01-01",
//       end_date: "2024-12-31",
//       gallery_id: 1,
//     };
//     const response = await request(app)
//       .post("/api/exhibitions")
//       .send(newPayload);
//     expect(response.status).toBe(201);
//     expect(response.body.entity.name).toBe(newPayload.name);
//   });
//
//   it("should delete an existing exhibition and return 204", async () => {
//     const response = await request(app).delete("/api/exhibitions/1");
//     expect(response.status).toBe(204);
//   });
//
//   it("should return 404 when trying to delete a non-existing exhibition", async () => {
//     const response = await request(app).delete("/api/exhibitions/-1");
//     expect(response.status).toBe(404);
//   });
// });
