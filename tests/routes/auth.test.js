// const request = require("supertest");
// const app = require("../../api/app");
//
// describe("Auth Routes", () => {
//   let token;
//
//   it("should return 201 Created for valid registration", async () => {
//     const response = await request(app).post("/auth/register").send({
//       email: "testRegister@email.com",
//       password: "testPassword",
//       first_name: "Test",
//       last_name: "User",
//       role: "artist",
//     });
//     expect(response.status).toBe(201);
//   });
//
//   // Test for POST login
//   it("should return 200 OK for valid login", async () => {
//     const response = await request(app)
//       .post("/auth/login")
//       .send({ email: "testRegister@email.com", password: "testPassword" });
//     expect(response.status).toBe(200);
//     token = response.body.token;
//   });
//
//   // Test for POST logout
//   it("should return 200 OK for logout", async () => {
//     const response = await request(app)
//       .post("/auth/logout")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.status).toBe(200);
//   });
//
//   // Test for POST forgot-password
//   it("should return 200 OK for forgot-password", async () => {
//     const response = await request(app)
//       .post("/auth/forgot-password")
//       .send({ email: "testRegister@email.com" });
//     expect(response.status).toBe(200);
//   });
//
//   // Test for PUT reset-password
//   it("should return 200 OK for reset-password", async () => {
//     const token = "someValidToken";
//     const response = await request(app)
//       .put(`/auth/reset-password/${token}`)
//       .send({ password: "newPassword" });
//     expect(response.status).toBe(200);
//   });
// });
