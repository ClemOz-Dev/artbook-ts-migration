const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const CategoryMock = dbMock.define("Category");

// Mocking the methods you'll be using
CategoryMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return CategoryMock.build(queryOptions);
  }
  if (query === "findOne") {
    return CategoryMock.build({
      label: "Painting",
    });
  }
  if (query === "update") {
    return [
      1,
      [
        CategoryMock.build({
          label: "Sculpture",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Category Model", () => {
  // Test for Create
  it("should create a new category", async () => {
    const mockCategory = {
      label: "Painting",
    };

    const newCategory = await CategoryMock.create(mockCategory);

    expect(newCategory.label).toBe(mockCategory.label);
  });

  // Test for Read
  it("should retrieve a category", async () => {
    const foundCategory = await CategoryMock.findOne({
      where: { label: "Painting" },
    });

    expect(foundCategory.label).toBe("Painting");
  });

  // Test for Update
  it("should update a category", async () => {
    const [updateCount, [updatedCategory]] = await CategoryMock.update(
      { label: "Sculpture" },
      { where: { label: "Painting" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedCategory.label).toBe("Sculpture");
  });

  // Test for Delete
  it("should delete a category", async () => {
    const deleteCount = await CategoryMock.destroy({
      where: { label: "Painting" },
    });

    expect(deleteCount).toBe(1);
  });
});
