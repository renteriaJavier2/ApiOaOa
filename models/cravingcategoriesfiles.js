'use strict';
module.exports = (sequelize, DataTypes) => {
  const CravingCategoriesFiles = sequelize.define('CravingCategoriesFiles', {
    id_parent: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ejeX: DataTypes.INTEGER,
    ejeX2: DataTypes.INTEGER,
    ejeY: DataTypes.INTEGER,
    ejeY2: DataTypes.INTEGER,
    W: DataTypes.INTEGER,
    H: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {});
  CravingCategoriesFiles.associate = function(models) {
    // associations can be defined here
  };
  return CravingCategoriesFiles;
};