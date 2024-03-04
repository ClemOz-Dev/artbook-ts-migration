const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const UserMock = dbMock.define("User");

UserMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return UserMock.build(queryOptions);
  }
  if (query === "findOne") {
    return UserMock.build({
      email: "test@email.com",
      password: "password123",
    });
  }
  if (query === "update") {
    return [
      1,
      [
        UserMock.build({
          email: "test@email.com",
          password: "newPassword",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("User Model", () => {
  it("should create a new user", async () => {
    const mockUser = {
      email: "test@email.com",
      password: "password123",
      role_id: 1,
      first_name: "John",
      last_name: "Doe",
      description: "Test description",
      image: "image_url",
    };

    const newUser = await UserMock.create(mockUser);

    expect(newUser.email).toBe(mockUser.email);
    expect(newUser.password).toBe(mockUser.password);
    // Add more fields
  });

  it("should retrieve a user", async () => {
    const foundUser = await UserMock.findOne({
      where: { email: "test@email.com" },
    });

    expect(foundUser.email).toBe("test@email.com");
    expect(foundUser.password).toBe("password123");
  });

  it("should update a user", async () => {
    const [updateCount, [updatedUser]] = await UserMock.update(
      { password: "newPassword" },
      { where: { email: "test@email.com" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedUser.password).toBe("newPassword");
  });

  it("should delete a user", async () => {
    const deleteCount = await UserMock.destroy({
      where: { email: "test@email.com" },
    });

    expect(deleteCount).toBe(1);
  });
});
