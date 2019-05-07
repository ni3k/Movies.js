/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const passport = require('passport');
const Router = require('../classes/RouteCreator');
const archivedMovies = require('../models/archivedmovies');

const Movie = require('../models/movie');

class UserInteractionsController extends Router {
  get services() {
    return {
      '/watchlater/:movieId': 'watchLater',
      '/getwatchlater': 'getWatchLater',
      '/checkMovie/:movieId': 'checkMovie'
    };
  }

  async watchLater(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      else {
        const { movieId } = req.params;
        const { id } = user;
        //  check the db and insert
        const found = await archivedMovies.findOne({ where: { userId: id, movieId } });
        if (found === null) {
          await archivedMovies.create({ userId: id, movieId });
        }
        else {
          await archivedMovies.destroy({ where: { userId: id, movieId } });
        }
      }
    })(req, res, next);
    res.send({ movies: [] });
  }

  async getWatchLater(req, res, next) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      else {
        //  check the db and insert
        const { id } = user;
        const moviesIds = await archivedMovies.findAll({ where: { userId: id }, raw: true, attributes: ['movieId'] });
        const moviesIdsFiltered = moviesIds.map(obj => obj.movieId);

        const count = moviesIds.length;
        const pages = Math.ceil(count / limit);
        if (page > pages) {
          res.send({ movies: [], pages: 1 });
          return;
        }
        offset = limit * (page - 1);
        const foundMovies = await Movie.findAll({
          where: { id: moviesIdsFiltered },
          raw: true,
          limit,
          offset,
          subQuery: false
        });
        console.log(foundMovies);
        res.send({
          movies: foundMovies,
          pages
        });
      }
    })(req, res, next);
  }

  async checkMovie(req, res, next) {
    const { movieId } = req.params;
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
        //  check the db and return
        const found = await archivedMovies.findOne({ where: { userId: id, movieId } });
        console.log(found);
        if (found === null) {
          res.send({ movie: false });
        }
        else {
          res.send({ movie: true });
        }
      }
    })(req, res, next);
  }
}

module.exports = UserInteractionsController;
