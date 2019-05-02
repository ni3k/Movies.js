const Movies = require('../models/movie');

Movies.findAll().then(res => console.log(res));
