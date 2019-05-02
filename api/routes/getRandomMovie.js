const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET random movie. */
router.get('/', async (req, res) => {
  let limit = 1;

  if (req.query.number !== undefined) {
    limit = parseInt(req.query.number, 10);
  }
  const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: MoviesJson }));
});

module.exports = router;
