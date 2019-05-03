const Sequelize = require('sequelize');
const db = require('../config/database');

const Genres = db.define(
  'genres',
  {
    title: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Genres;
