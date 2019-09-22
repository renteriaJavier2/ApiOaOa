'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CravingCategoriesFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_parent: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ejeX: {
        type: Sequelize.INTEGER
      },
      ejeX2: {
        type: Sequelize.INTEGER
      },
      ejeY: {
        type: Sequelize.INTEGER
      },
      ejeY2: {
        type: Sequelize.INTEGER
      },
      W: {
        type: Sequelize.INTEGER
      },
      H: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CravingCategoriesFiles');
  }
};