const Sequelize = require('sequelize');
const db = require('../config/database');
const GenreMovie = require('./relationGenreMovie');
const Genres = require('./genres');

const Movie = db.define(
  'movie',
  {
    title: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    rating: {
      type: Sequelize.STRING
    },
    poster: {
      type: Sequelize.STRING
    },
    imdbID: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

Movie.belongsToMany(Genres, { through: GenreMovie });
Genres.belongsToMany(Movie, { through: GenreMovie });

module.exports = Movie;
