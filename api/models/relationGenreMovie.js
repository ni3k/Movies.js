const Sequelize = require('sequelize');
const db = require('../config/database');

const GenreMovie = db.define(
  'relations',
  {
    movieId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    genreId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = GenreMovie;
