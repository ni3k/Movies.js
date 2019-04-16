const passport = require('passport');
const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log(req.body);
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    }
    else {
      req.logIn(user, () => {
        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        };
        User.findOne({
          where: {
            email: data.email
          }
        }).then((Founduser) => {
          Founduser
            .update({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email
            })
            .then(() => {
              console.log('user created in db');
              res.status(200).send({ message: 'user created' });
            });
        });
      });
    }
  })(req, res, next);
});

module.exports = router;
