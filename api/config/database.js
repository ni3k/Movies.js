const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.movie = require('../models/movie');
// db.genres = require('../models/genres');

// db.movie.belongsToMany(db.genres, {
//   as: 'Movies', through: 'relations', foreignKey: 'movieId', otherKey: 'genreId'
// });
// db.genres.belongsToMany(db.movie, {
//   as: 'Genre', through: 'relations', foreignKey: 'genreId', otherKey: 'movieId'
// });

module.exports = sequelize;

//  db.authenticate().then(() => console.log('db connected')).catch(err => console.log(err));
