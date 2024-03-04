const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const ArtworkMock = dbMock.define("Artwork");

ArtworkMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return ArtworkMock.build(queryOptions);
  }
  if (query === "findOne") {
    return ArtworkMock.build({
      name: "Mona Lisa",
      image: "image_url",
      description: "A portrait by Leonardo da Vinci",
      category_id: 1,
      user_id: 1,
      available: true,
    });
  }
  if (query === "update") {
    return [
      1,
      [
        ArtworkMock.build({
          name: "Starry Night",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Artwork Model", () => {
  it("should create a new artwork", async () => {
    const mockArtwork = {
      name: "Mona Lisa",
      image: "image_url",
      description: "A portrait by Leonardo da Vinci",
      category_id: 1,
      user_id: 1,
      available: true,
    };

    const newArtwork = await ArtworkMock.create(mockArtwork);

    expect(newArtwork.name).toBe(mockArtwork.name);
    expect(newArtwork.image).toBe(mockArtwork.image);
  });

  it("should retrieve an artwork", async () => {
    const foundArtwork = await ArtworkMock.findOne({
      where: { name: "Mona Lisa" },
    });

    expect(foundArtwork.name).toBe("Mona Lisa");
    expect(foundArtwork.image).toBe("image_url");
  });

  it("should update an artwork", async () => {
    const [updateCount, [updatedArtwork]] = await ArtworkMock.update(
      { name: "Starry Night" },
      { where: { name: "Mona Lisa" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedArtwork.name).toBe("Starry Night");
  });

  it("should delete an artwork", async () => {
    const deleteCount = await ArtworkMock.destroy({
      where: { name: "Mona Lisa" },
    });

    expect(deleteCount).toBe(1);
  });
});
