const express = require('express');

const router = express.Router();
const Genres = require('../models/genres');

/* GET all genres. */
router.get('/', async (req, res) => {
  const relationsJson = (await Genres.findAll({ attributes: ['title', 'id'] }));
  res.send({ genre: relationsJson });
});

module.exports = router;
