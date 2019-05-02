const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET random movie. */
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.number, 10) || 1;
  const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
  res.send({ movies: MoviesJson });
});

module.exports = router;
