'use strict';
module.exports = (sequelize, DataTypes) => {
  const CravingCategories = sequelize.define('CravingCategories', {
    name: DataTypes.STRING,
    created: DataTypes.INTEGER,
    updated: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    last: DataTypes.INTEGER
  }, {});
  CravingCategories.associate = function(models) {
    // associations can be defined here
  };
  return CravingCategories;
};