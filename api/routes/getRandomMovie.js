const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET random movie. */
router.get('/', async (req, res) => {
  const MoviesJson = await Movie.findOne({ order: Sequelize.literal('rand()'), raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: [MoviesJson] }));
});

module.exports = router;
