const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET by title movie. */
router.get('/', async (req, res) => {
  const { query: { title } } = req;
  res.setHeader('Content-Type', 'application/json');
  if (title === undefined) {
    res.end(JSON.stringify({ movies: [] }));
  }

  const MoviesJson = await Movie.findAll(
    { where: { title: { [Sequelize.Op.substring]: title } }, raw: true }
  );
  res.end(JSON.stringify({ movies: MoviesJson }));
});

module.exports = router;
