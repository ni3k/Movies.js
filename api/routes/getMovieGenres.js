const express = require('express');

const router = express.Router();

const relationDb = require('../models/relationGenreMovie');
const genresDb = require('../models/genres');

/* GET  genres by movie. */
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const relationsJson = (await relationDb.findAll({
    attributes: ['genreId'],
    raw: true,
    where: { movieId }
  })).map(relation => relation.genreId);
  console.log(relationsJson);
  const withStrings = await genresDb.findAll({ where: { id: relationsJson }, raw: true });
  res.setHeader('Content-Type', 'application/json');
  let withString = false;
  if (typeof req.query.string !== 'undefined') {
    withString = true;
  }
  if (withString) {
    res.end(JSON.stringify({ genres: withStrings }));
  }
  res.end(JSON.stringify({ genres: relationsJson }));
});

module.exports = router;
