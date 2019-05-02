const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const User = require('../models/users');
const jwtSecret = require('../config/jwtConfig');

const router = express.Router();


router.post('/', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    console.log(user);
    if (err) {
      res.status(200).send({
        auth: false,
        message: err
      });
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(200).send({
        auth: false,
        message: info.message
      });
    }
    else {
      req.logIn(user, () => {
        User.findOne({
          where: {
            email: user.email
          }
        }).then((foundUser) => {
          const token = jwt.sign({ id: foundUser.email }, jwtSecret.secret);
          res.status(200).send({
            auth: true,
            token,
            message: 'user found & logged in'
          });
        });
      });
    }
  })(req, res, next);
});

module.exports = router;
