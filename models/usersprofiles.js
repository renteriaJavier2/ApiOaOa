'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersProfiles = sequelize.define('UsersProfiles', {
    user_pro_name: DataTypes.STRING
  }, {});
  UsersProfiles.associate = function(models) {
    // associations can be defined here
  };
  return UsersProfiles;
};