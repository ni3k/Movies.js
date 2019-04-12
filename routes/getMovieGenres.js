const express = require('express');

const router = express.Router();

const Relations = require('../modeles/relationGenreMovie');

/* GET  genres by movie. */
router.get('/:idMovie', async (req, res) => {
  const { idMovie } = req.params;
  console.log(idMovie);
  const relationsJson = (await Relations.findAll({ attributes: ['idGenre'], raw: true, where: { idMovie } })).map(relation => relation.idGenre);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ genres: relationsJson }));
});

module.exports = router;
