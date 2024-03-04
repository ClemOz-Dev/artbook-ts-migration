const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const ArtistMock = dbMock.define("Artist");

// Mocking the methods you'll be using
ArtistMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return ArtistMock.build(queryOptions);
  }
  if (query === "findOne") {
    return ArtistMock.build({
      email: "artist@email.com",
      password: "password123",
      role_id: 1,
      first_name: "Jane",
      last_name: "Doe",
      description: "Artist description",
      image: "image_url",
    });
  }
  if (query === "update") {
    return [
      1,
      [
        ArtistMock.build({
          email: "artist@email.com",
          password: "newPassword",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Artist Model", () => {
  it("should create a new artist", async () => {
    const mockArtist = {
      email: "artist@email.com",
      password: "password123",
      role_id: 1,
      first_name: "Jane",
      last_name: "Doe",
      description: "Artist description",
      image: "image_url",
    };

    const newArtist = await ArtistMock.create(mockArtist);

    expect(newArtist.email).toBe(mockArtist.email);
    expect(newArtist.password).toBe(mockArtist.password);
  });

  it("should retrieve an artist", async () => {
    const foundArtist = await ArtistMock.findOne({
      where: { email: "artist@email.com" },
    });

    expect(foundArtist.email).toBe("artist@email.com");
    expect(foundArtist.password).toBe("password123");
  });

  it("should update an artist", async () => {
    const [updateCount, [updatedArtist]] = await ArtistMock.update(
      { password: "newPassword" },
      { where: { email: "artist@email.com" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedArtist.password).toBe("newPassword");
  });

  it("should delete an artist", async () => {
    const deleteCount = await ArtistMock.destroy({
      where: { email: "artist@email.com" },
    });

    expect(deleteCount).toBe(1);
  });
});
