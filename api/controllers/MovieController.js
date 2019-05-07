/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const axios = require('axios');
const Sequelize = require('sequelize');
const Router = require('../classes/RouteCreator');
const Movie = require('../models/movie');
const Genre = require('../models/genres');

/**
 * Represents MovieController.
 * @constructor
 */
class MovieController extends Router {
  /** replaces the function services from Roter class (classes/RouteCreator) */
  get services() {
    return {
      '/all_movies': 'routerAllMovies',
      '/movie/:id': 'routerSingleMovie',
      '/random_movie': 'randomMovie',
      '/by_genre': 'byGenre',
      '/searchTitle': 'searchTitle'

    };
  }

  /** /all_movies -> returns a list of movies ordered by
   * the year, optional: ?limit=10 and ?page=1
   * @param {Request} req
   * @param {number} req.query.limit
   * @param {number} req.query.page
   * @param {Response} res
   * @returns {object} */
  async routerAllMovies(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const count = await Movie.count();
    console.log(count, page);
    const pages = Math.ceil(count, 10 / limit);
    console.log(pages);
    if (page > pages) {
      return res.send({ movies: [] });
    }
    offset = limit * (page - 1);

    const MoviesJson = await Movie.findAll({
      limit,
      offset,
      order: [['year', 'DESC']],
      include: {
        model: Genre
      }
    });

    return res.send({ movies: MoviesJson, pages });
  }

  /** /movie/:id -> returns movie object and generated ticket by videospider api
   * @param {Request} req
   * @param {number} req.params.id
   * @param {Response} res
   * @returns {object} */
  async routerSingleMovie(req, res) {
    const { id } = req.params;
    const moviesJson = await Movie.findAll({
      where: { id },
      include: {
        model: Genre
      }
    }).map(el => el.get({ plain: true }));
    const ip = '188.237.151.9'; //  req.ip;
    const { data: ticket } = await axios.get(`https://videospider.in/getticket.php?key=gIBI3N1PHUQ0H9mB&secret_key=${process.env.SECRET_KEY_VIDEOSPIDER}&video_id=${moviesJson[0].imdbID}&ip=${ip}`);
    moviesJson[0].Ticket = ticket;
    console.log(moviesJson);
    res.send({ movies: moviesJson[0] });
  }

  /** /random_movie -> returns a random movie from the db
   * @param {Request} req
   * @param {number} req.query.limit
   * @param {Response} res
   * @returns {object}
  */
  async randomMovie(req, res) {
    const limit = parseInt(req.query.number, 10) || 1;
    const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
    res.send({ movies: MoviesJson });
  }

  /** /by_genre -> sorts movie by genre: requires ?genres=1,3,4
   * (numbers of genre ids) and optional ?limit=10 and ?page = 1
   * @param {Request} req
   * @param {number} req.query.limit
   * @param {number} req.query.page
   * @param {string} req.query.genres
   * @param {Response} res
   * @returns {object} */
  async byGenre(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    // check if there are any params
    if (typeof req.query.genres === 'undefined') {
      return res.send({ movies: [] });
    }

    const genres = req.query.genres.split(',');
    const count = await Movie.count({
      include: [{
        model: Genre,
        where: { id: genres }
      }]
    });
    const pages = Math.ceil(count / limit);
    if (page > pages) {
      return res.send({ movies: [] });
    }
    offset = limit * (page - 1);
    const foundMovies = await Movie.findAll({
      limit,
      offset,
      include: [{
        model: Genre,
        where: { id: genres }
      }]
    });

    return res.send({ movies: foundMovies, pages });
  }

  /** /searchTitle -> returns movies with substring included
   * in search query: requires ?title=blabla and optional ?limit=10 and ?page=1
   * @param {Request} req
   * @param {number} req.query.limit
   * @param {number} req.query.page
   * @param {string} req.query.title
   * @param {Response} res
   * @returns {object} */
  async searchTitle(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const { query: { title } } = req;
    if (title === undefined) {
      return res.send({ movies: [], pages: 0 });
    }
    const count = await Movie.count({
      where: { title: { [Sequelize.Op.substring]: title } }
    });
    const pages = Math.ceil(count / limit);
    if (page > pages) {
      return res.send({ movies: [], pages: 0 });
    }
    offset = limit * (page - 1);

    const MoviesJson = await Movie.findAll(
      {
        where: { title: { [Sequelize.Op.substring]: title } }, raw: true, limit, offset
      }
    );
    return res.send({ movies: MoviesJson, pages });
  }
}

module.exports = MovieController;
