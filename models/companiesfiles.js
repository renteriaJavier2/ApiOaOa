'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompaniesFiles = sequelize.define('CompaniesFiles', {
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
  CompaniesFiles.associate = function(models) {
    // associations can be defined here
  };
  return CompaniesFiles;
};