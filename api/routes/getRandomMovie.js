const express = require('express');

const router = express.Router();
const randomInt = require('random-int');
const Movie = require('../models/movie');

/* GET random movie. */
router.get('/', async (req, res) => {
  const topId = await Movie.max('id');
  const id = randomInt(1, topId);
  const MoviesJson = await Movie.findOne({ where: { id }, raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: [MoviesJson] }));
});

module.exports = router;
