const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const RoleMock = dbMock.define("Role");

// Mocking the methods you'll be using
RoleMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return RoleMock.build(queryOptions);
  }
  if (query === "findOne") {
    return RoleMock.build({
      label: "Admin",
    });
  }
  if (query === "update") {
    return [
      1,
      [
        RoleMock.build({
          label: "User",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Role Model", () => {
  // Test for Create
  it("should create a new role", async () => {
    const mockRole = {
      label: "Admin",
    };

    const newRole = await RoleMock.create(mockRole);

    expect(newRole.label).toBe(mockRole.label);
  });

  // Test for Read
  it("should retrieve a role", async () => {
    const foundRole = await RoleMock.findOne({ where: { label: "Admin" } });

    expect(foundRole.label).toBe("Admin");
  });

  // Test for Update
  it("should update a role", async () => {
    const [updateCount, [updatedRole]] = await RoleMock.update(
      { label: "User" },
      { where: { label: "Admin" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedRole.label).toBe("User");
  });

  // Test for Delete
  it("should delete a role", async () => {
    const deleteCount = await RoleMock.destroy({ where: { label: "Admin" } });

    expect(deleteCount).toBe(1);
  });
});
