const Sequelize = require('sequelize');
const db = require('../config/database');

const archivedMovies = db.define('archivedMovies', {
  movieId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
}, { freezeTableName: true });

module.exports = archivedMovies;
