const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const GalleryMock = dbMock.define("Gallery");

// Mocking the methods you'll be using
GalleryMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return GalleryMock.build(queryOptions);
  }
  if (query === "findOne") {
    return GalleryMock.build({
      image: "image_url",
      road: "Sample Road",
      zipcode: "12345",
      city: "Sample City",
      country: "Sample Country",
      user_id: 1,
    });
  }
  if (query === "update") {
    return [
      1,
      [
        GalleryMock.build({
          road: "Updated Road",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Gallery Model", () => {
  // Test for Create
  it("should create a new gallery", async () => {
    const mockGallery = {
      image: "image_url",
      road: "Sample Road",
      zipcode: "12345",
      city: "Sample City",
      country: "Sample Country",
      user_id: 1,
    };

    const newGallery = await GalleryMock.create(mockGallery);

    expect(newGallery.image).toBe(mockGallery.image);
    expect(newGallery.road).toBe(mockGallery.road);
    expect(newGallery.zipcode).toBe(mockGallery.zipcode);
    expect(newGallery.city).toBe(mockGallery.city);
    expect(newGallery.country).toBe(mockGallery.country);
    expect(newGallery.user_id).toBe(mockGallery.user_id);
  });

  // Test for Read
  it("should retrieve a gallery", async () => {
    const foundGallery = await GalleryMock.findOne({
      where: { road: "Sample Road" },
    });

    expect(foundGallery.road).toBe("Sample Road");
  });

  // Test for Update
  it("should update a gallery", async () => {
    const [updateCount, [updatedGallery]] = await GalleryMock.update(
      { road: "Updated Road" },
      { where: { road: "Sample Road" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedGallery.road).toBe("Updated Road");
  });

  // Test for Delete
  it("should delete a gallery", async () => {
    const deleteCount = await GalleryMock.destroy({
      where: { road: "Sample Road" },
    });

    expect(deleteCount).toBe(1);
  });
});
