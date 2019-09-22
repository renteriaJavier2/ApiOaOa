'use strict';
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define('Companies', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    state: DataTypes.INTEGER,
    created: DataTypes.INTEGER,
    updated: DataTypes.INTEGER,
    last: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    schedule:DataTypes.INTEGER,
    map: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    ing: DataTypes.INTEGER
  }, {});
  Companies.associate = function(models) {
    // associations can be defined here
  };
  return Companies;
};