module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("movie", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable("movie");
  }
};
