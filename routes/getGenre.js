const express = require('express');

const router = express.Router();
const Genre = require('../modeles/genres');

/* GET  genres by id. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const relationsJson = (await Genre.findByPk(id, { attributes: ['title'] })).title;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ genre: relationsJson }));
});

module.exports = router;
