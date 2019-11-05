'use strict';
module.exports = (sequelize, DataTypes) => {
  const CravingUserApp = sequelize.define('CravingUserApp', {
    cravingId: DataTypes.INTEGER,
    userAppId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    craving_total_item:DataTypes.INTEGER,
    craving_total:DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  CravingUserApp.associate = function(models) {
    // associations can be defined here
  };
  return CravingUserApp;
};