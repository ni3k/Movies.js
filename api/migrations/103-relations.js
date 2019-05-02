const genre = require('../models/genres');
const movie = require('../models/movie');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('relations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movie',
          key: 'id'
        }
      },
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('relations');
  }
};
