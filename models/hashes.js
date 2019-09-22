'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hashes = sequelize.define('Hashes', {
    random_hash: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
  }, {});
  Hashes.associate = function(models) {
    // associations can be defined here
  };
  return Hashes;
};