const express = require('express');

const router = express.Router();
const api = require('../apiConfig/config');
const archivedMovies = require('../models/archivedmovies');

/* check eligibliness. */
router.get('/:movieId', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { movieId } = req.params;
  const token = req.get('Authorization');
  if (!token) {
    res.status(200).send({
      movie: false
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
    //  check the db and return
    const found = await archivedMovies.findOne({ where: { userId: id, movieId } });
    console.log(found);
    if (found === null) {
      res.end(JSON.stringify({ movie: false }));
    }
    else {
      res.end(JSON.stringify({ movie: true }));
    }
  }
  res.end(JSON.stringify({ movie: false }));
});

module.exports = router;
