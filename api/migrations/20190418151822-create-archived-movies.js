

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('archivedMovies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    movieId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('archivedMovies')
};
