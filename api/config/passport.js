const bcrypt = require('bcrypt');
const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  User = require('../models/users');

const jwtSecret = require('./jwtConfig');

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  // eslint-disable-next-line new-cap
  new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (username, password, done) => {
    try {
      User.findOne({
        where: { email: username }
      }).then((user) => {
        if (user !== null) {
          console.log('username taken');
          return done(null, false, { message: 'already taken' });
        }
        // else
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
          User.create({ email: username, password: hashedPassword }).then((newUser) => {
            console.log('user created');
            return done(null, newUser);
          });
        });
      });
    }
    catch (err) {
      done(err);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwtPayload, done) => {
    try {
      User.findOne({
        where: {
          email: jwtPayload.id
        }
      }).then((user) => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        }
        else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    }
    catch (err) {
      done(err);
    }
  }),
);

passport.use(
  'login',
  // eslint-disable-next-line new-cap
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            email: username
          }
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }

          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            // note the return needed with passport local - remove this return for passport JWT
            return done(null, user);
          });
        });
      }
      catch (err) {
        done(err);
      }
    },
  ),
);
