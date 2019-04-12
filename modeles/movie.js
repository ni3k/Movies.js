const Sequelize = require('sequelize');
const db = require('../config/database');

const Movie = db.define('movie', {
    
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
    }

}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

module.exports = Movie;