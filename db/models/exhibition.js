'use strict';
const { Model } = require('sequelize');
const timestamps = require('../../utils/timestampsModel');

module.exports = (sequelize, DataTypes) => {
  class Exhibition extends Model {
    static associate(models) {
      Exhibition.belongsTo(models.Gallery, {
        foreignKey: 'gallery_id',
        as: 'gallery',
      });
      Exhibition.belongsToMany(models.Artwork, {
        through: 'exhibition_has_artworks',
        as: 'artworks',
        foreignKey: 'exhibition_id',
      });
    }

    get galleryId() {
      return this.getDataValue('gallery_id');
    }

    set galleryId(value) {
      this.setDataValue('gallery_id', value);
    }
  }

  Exhibition.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDate: {
        type: DataTypes.DATE,
        field: 'start_date',
      },
      endDate: {
        type: DataTypes.DATE,
        field: 'end_date',
      },
      ...timestamps,
      galleryId: {
        type: DataTypes.INTEGER,
        field: 'gallery_id',
      },
    },
    {
      sequelize,
      modelName: 'Exhibition',
    },
  );

  return Exhibition;
};
