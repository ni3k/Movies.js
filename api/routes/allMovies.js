const express = require('express');

const router = express.Router();
const Movie = require('../models/movie');
const Relations = require('../models/relationGenreMovie');
const Genre = require('../models/genres');

/* GET all movies. */
router.get('/', async (req, res) => {
  let offset = 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const count = await Movie.count();
  console.log(count, page);
  const pages = Math.ceil(parseInt(count, 10) / limit);
  console.log(pages);
  if (page > pages) {
    res.send({ movies: [] });
    return;
  }
  offset = limit * (page - 1);

  const MoviesJson = await Movie.findAll({
    raw: true,
    limit,
    offset,
    order: [['year', 'DESC']],
    include: {
      model: Genre
    }
  });
  // console.log(MoviesJson);

  res.send({ movies: MoviesJson, pages });
});

module.exports = router;
