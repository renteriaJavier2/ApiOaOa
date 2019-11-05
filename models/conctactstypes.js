'use strict';
module.exports = (sequelize, DataTypes) => {
  const ConctactsTYpes = sequelize.define('ConctactsTYpes', {
    name: DataTypes.STRING
  }, {}); 
  ConctactsTYpes.associate = function(models) {
    // associations can be defined here
  };
  return ConctactsTYpes;
};