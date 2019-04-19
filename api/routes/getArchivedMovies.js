const express = require('express');

const router = express.Router();
const Movies = require('../models/movie');
const api = require('../apiConfig/config');
const archivedMovies = require('../models/archivedmovies');

/* GET archived movies later. */
router.get('/', async (req, res) => {
  let page = 1;
  let limit = 10;
  let offset = 0;

  if (typeof req.query.page !== 'undefined') page = parseInt(req.query.page, 10);
  if (typeof req.query.limit !== 'undefined') limit = parseInt(req.query.limit, 10);


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

  const count = moviesIds.length;
  const pages = Math.ceil(count / limit);
  if (page > pages) res.end(JSON.stringify({ movies: [], pages: 1 }));
  offset = limit * (page - 1);
  const foundMovies = await Movies.findAll({
    where: { id: moviesIdsFiltered },
    raw: true,
    limit,
    offset,
    subQuery: false
  });
  console.log(foundMovies);

  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    movies: foundMovies,
    pages
  }));
});

module.exports = router;
