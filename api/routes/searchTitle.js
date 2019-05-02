const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const Movie = require('../models/movie');

/* GET by title movie. */
router.get('/', async (req, res) => {
  let offset = 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const { query: { title } } = req;
  if (title === undefined) {
    res.send({ movies: [] });
  }
  const { count } = await Movie.count({
    where: { title: { [Sequelize.Op.substring]: title } }
  });
  const pages = Math.ceil(count / limit);
  if (page > pages) {
    res.send({ movies: [] });
    return;
  }
  offset = limit * (page - 1);

  const MoviesJson = await Movie.findAll(
    {
      where: { title: { [Sequelize.Op.substring]: title } }, raw: true, limit, offset
    }
  );
  res.send({ movies: MoviesJson, pages });
});

module.exports = router;
