'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersTypes = sequelize.define('UsersTypes', {
    name: DataTypes.STRING
  }, {});
  UsersTypes.associate = function(models) {
    // associations can be defined here
  };
  return UsersTypes;
};