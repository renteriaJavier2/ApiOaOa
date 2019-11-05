'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_App = sequelize.define('User_App', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    tweeter_id: DataTypes.STRING
  }, {});
  User_App.associate = function(models) {
    // associations can be defined here
  };
  return User_App;
};