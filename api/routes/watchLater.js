const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
const api = require('../apiConfig/axios');
const archivedMovies = require('../models/archivedmovies');

/* GET watch later. */
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const token = req.get('Authorization');
  console.log(token);
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
  console.log(movieId);
  if (auth) {
    //  check the db and insert
    const found = await archivedMovies.findOne({ where: { userId: id, movieId } });
    if (found === null) {
      await archivedMovies.create({ userId: id, movieId });
    }
    else {
      await archivedMovies.destroy({ where: { userId: id, movieId } });
    }
  }
  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
  res.send({ movies: [] });
});

module.exports = router;
