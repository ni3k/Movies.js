module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("relations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "movie",
          key: "id"
        },
        allowNull: false
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: "genres",
          key: "id"
        },
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable("relations");
  }
};
