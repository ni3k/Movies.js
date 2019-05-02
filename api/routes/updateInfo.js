const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/users');
const jwtSecret = require('../config/jwtConfig');

const router = express.Router();
const api = require('../apiConfig/axios');


/* patch user info. */
router.patch('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const token = req.get('Authorization');
  if (!token) {
    res.status(200).send({
      succes: 0
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
    User.update({ firstName, email, lastName }, { where: { id } });
    const Token = jwt.sign({ id: email }, jwtSecret.secret);
    res.send({ token: Token });
    console.log(req.body);
  }
  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
  res.send({ succes: 0 });
});

module.exports = router;
