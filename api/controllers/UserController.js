/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Router = require('../classes/RouteCreator');
const User = require('../models/users');
const jwtSecret = require('../config/jwtConfig');

/**
 * Represents UserController.
 * @constructor
 */
class UserController extends Router {
  /** replaces the function services from Roter class (classes/RouteCreator) */
  get services() {
    return {
      'POST /register': 'registerUser',
      'POST /login': 'loginUser',
      'PATCH /updateUser': 'updateUser',
      '/finduser': 'findUser'
    };
  }

  /** patch to /updateUser, requires firstName,
   * lastName and email in req.body and jwt token in headers (Authorization) */
  async updateUser(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      else {
        const { id } = user;
        const { firstName, lastName, email } = req.body;
        //  check the db and insert
        User.update({ firstName, email, lastName }, { where: { id } });
        const Token = jwt.sign({ id: email }, jwtSecret.secret);
        res.send({ token: Token });
      }
    })(req, res, next);
    res.send({ succes: 0 });
  }

  /** Post to /register, requires firstName, lastName,
   * password and email in req.body, uses passport with the name register */
  async registerUser(req, res, next) {
    console.log(req.body);
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        res.status(200).send({ message: err });
      }
      if (info !== undefined) {
        res.status(200).send({ message: info.message });
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
                res.status(200).send({ message: 'user created' });
              });
          });
        });
      }
    })(req, res, next);
  }

  /** Post to /login, requires email and password in body, uses passport with the name login */
  async loginUser(req, res, next) {
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
  }

  /** get /finduser -> returns  info of the user, need header Authorization with the jwt token */
  async findUser(req, res, next) {
    console.log(req.get('Authorization'));
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
        console.log(user);
        res.status(200).send({
          auth: true,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          message: 'user found in db'
        });
      }
    })(req, res, next);
  }
}

module.exports = UserController;
