const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    }
    else {
      console.log('user found in db from route');
      res.status(200).send({
        auth: true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        message: 'user found in db'
      });
    }
  })(req, res, next);
});

module.exports = router;
