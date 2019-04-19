const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const api = require('../apiConfig/config');
const archivedMovies = require('../models/archivedmovies');

/* GET watch later. */
router.get('/:movieId', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { movieId } = req.params;
  const token = req.get('Authorization');
  if (!token) {
    res.status(200).send({
      movies: []
    });
  }
  const {
    data: {
      auth,
      id
    }
  } = await api.get('/finduser', {
    headers: { Authorization: token }
  });
  console.log(auth);
  console.log(id);
  if (auth) {
    //  check the db and insert
    await archivedMovies.findOrCreate({ where: { userId: id, movieId } });
  }
  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
  res.end(JSON.stringify({ movies: [] }));
});

module.exports = router;
