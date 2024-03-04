const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const ExhibitionMock = dbMock.define("Exhibition");

// Mocking the methods you'll be using
ExhibitionMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === "create") {
    return ExhibitionMock.build(queryOptions);
  }
  if (query === "findOne") {
    return ExhibitionMock.build({
      name: "Summer Exhibition",
      start_date: new Date(),
      end_date: new Date(),
    });
  }
  if (query === "update") {
    return [
      1,
      [
        ExhibitionMock.build({
          name: "Winter Exhibition",
        }),
      ],
    ];
  }
  if (query === "destroy") {
    return 1;
  }
});

describe("Exhibition Model", () => {
  // Test for Create
  it("should create a new exhibition", async () => {
    const mockExhibition = {
      name: "Summer Exhibition",
      start_date: new Date(),
      end_date: new Date(),
    };

    const newExhibition = await ExhibitionMock.create(mockExhibition);

    expect(newExhibition.name).toBe(mockExhibition.name);
    expect(newExhibition.start_date).toEqual(mockExhibition.start_date);
    expect(newExhibition.end_date).toEqual(mockExhibition.end_date);
  });

  // Test for Read
  it("should retrieve an exhibition", async () => {
    const foundExhibition = await ExhibitionMock.findOne({
      where: { name: "Summer Exhibition" },
    });

    expect(foundExhibition.name).toBe("Summer Exhibition");
  });

  // Test for Update
  it("should update an exhibition", async () => {
    const [updateCount, [updatedExhibition]] = await ExhibitionMock.update(
      { name: "Winter Exhibition" },
      { where: { name: "Summer Exhibition" }, returning: true }
    );

    expect(updateCount).toBe(1);
    expect(updatedExhibition.name).toBe("Winter Exhibition");
  });

  // Test for Delete
  it("should delete an exhibition", async () => {
    const deleteCount = await ExhibitionMock.destroy({
      where: { name: "Summer Exhibition" },
    });

    expect(deleteCount).toBe(1);
  });
});
