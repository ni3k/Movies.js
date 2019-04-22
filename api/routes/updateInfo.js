const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/users');
const jwtSecret = require('../config/jwtConfig');

const router = express.Router();
const api = require('../apiConfig/config');


/* patch user info. */
router.patch('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  res.setHeader('Content-Type', 'application/json');
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
    res.end(JSON.stringify({ token: Token }));
    console.log(req.body);
  }
  // const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
  res.end(JSON.stringify({ succes: 0 }));
});

module.exports = router;
