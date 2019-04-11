const db = require('../config/database');
const Movie = require('../modeles/movie');
Movie.findAll().then(res => console.log(res));