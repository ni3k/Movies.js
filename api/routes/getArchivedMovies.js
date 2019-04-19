const express = require('express');

const router = express.Router();
const Movies = require('../models/movie');
const api = require('../apiConfig/config');
const archivedMovies = require('../models/archivedmovies');

/* GET archived movies later. */
router.get('/', async (req, res) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(200).send({
      movies: []
    });
  }
  const { data: { auth, id } } = await api.get('/finduser', {
    headers: { Authorization: token }
  });
  console.log(auth);
  if (auth !== true) {
    res.status(200).send({
      movies: []
    });
  }

  //  check the db and insert

  const moviesIds = await archivedMovies.findAll({ where: { userId: id }, raw: true, attributes: ['movieId'] });
  const moviesIdsFiltered = moviesIds.map(obj => obj.movieId);
  const foundMovies = await Movies.findAll({ where: { id: moviesIdsFiltered } }, { raw: true });
  console.log(foundMovies);

  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    movies: foundMovies
  }));
});

module.exports = router;
