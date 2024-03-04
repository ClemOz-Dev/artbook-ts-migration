'use strict';
const {Model} = require('sequelize');
const timestamps = require('../../utils/timestampsModel')

module.exports = (sequelize, DataTypes) => {
    class ExhibitionHasArtwork extends Model {}
    
    ExhibitionHasArtwork.init({...timestamps}, 
        {
            sequelize, 
            modelName: 'exhibition_has_artworks', 
            tableName: 'ExhibitionHasArtworks'
        }
    )
    return ExhibitionHasArtwork;
};
