'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_pro_id: DataTypes.INTEGER,
    user_type_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_lastname: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_pass: DataTypes.STRING,
    user_state: DataTypes.INTEGER,
    user_visible: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};