const request = require("supertest");
const express = require("express");
const CoreController = require("../../api/controllers/coreController.js");

// Mock repository
const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Create CoreController instance
const coreController = new CoreController(mockRepository);

// Setup express application
const app = express();
app.use(express.json());
app.post("/create", coreController.create);
app.get("/findAll", coreController.findAll);
app.get("/findById/:id", coreController.findById);
app.put("/update/:id", coreController.update);
app.delete("/delete/:id", coreController.delete);

describe("CoreController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an entity", async () => {
    mockRepository.create.mockResolvedValue({ id: 1, name: "Test" });
    const response = await request(app).post("/create").send({ name: "Test" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: "Test" });
  });

  it("should find all entities", async () => {
    mockRepository.findAll.mockResolvedValue([{ id: 1, name: "Test" }]);
    const response = await request(app).get("/findAll");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Test" }]);
  });

  it("should find an entity by ID", async () => {
    mockRepository.findById.mockResolvedValue({ id: 1, name: "Test" });
    const response = await request(app).get("/findById/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Test" });
  });

  it("should update an entity", async () => {
    mockRepository.update.mockResolvedValue({ id: 1, name: "Updated" });
    const response = await request(app)
      .put("/update/1")
      .send({ name: "Updated" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Updated" });
  });

  it("should delete an entity", async () => {
    mockRepository.delete.mockResolvedValue(true);
    const response = await request(app).delete("/delete/1");
    expect(response.status).toBe(204);
  });
});
