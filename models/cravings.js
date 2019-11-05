'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cravings = sequelize.define('Cravings', {
    companyId: DataTypes.INTEGER,
    cravingCtgId: DataTypes.INTEGER,
    hasStock: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Cravings.associate = function(models) {
    // associations can be defined here
  };
  return Cravings;
};