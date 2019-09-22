'use strict';
module.exports = (sequelize, DataTypes) => {
  const CravingStates = sequelize.define('CravingStates', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  CravingStates.associate = function(models) {
    // associations can be defined here
  };
  return CravingStates;
};