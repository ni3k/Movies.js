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
  if (typeof req.query.string !== 'undefined') {
    res.send({ genres: withStrings });
  }
  res.send({ genres: relationsJson });
});

module.exports = router;
