const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET by title movie. */
router.get('/', async (req, res) => {
  let page = 1;
  let limit = 10;
  let offset = 0;
  const { query: { title } } = req;
  res.setHeader('Content-Type', 'application/json');
  if (title === undefined) {
    res.end(JSON.stringify({ movies: [] }));
  }
  if (typeof req.query.page !== 'undefined') page = parseInt(req.query.page, 10);
  if (typeof req.query.limit !== 'undefined') limit = parseInt(req.query.limit, 10);
  const { count } = await Movie.findAndCountAll({
    where: { title: { [Sequelize.Op.substring]: title } }
  });
  const pages = Math.ceil(count / limit);
  if (page > pages) res.end(JSON.stringify({ movies: [] }));
  offset = limit * (page - 1);

  const MoviesJson = await Movie.findAll(
    {
      where: { title: { [Sequelize.Op.substring]: title } }, raw: true, limit, offset
    }
  );
  res.end(JSON.stringify({ movies: MoviesJson, pages }));
});

module.exports = router;
