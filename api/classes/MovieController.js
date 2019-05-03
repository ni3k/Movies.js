/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const express = require('express');
const axios = require('axios');
const Sequelize = require('sequelize');
const Router = require('./RouteCreator');

const Movie = require('../models/movie');
const Genre = require('../models/genres');

class MovieController extends Router {
  get services() {
    return {
      '/all_movies': 'routerAllMovies',
      '/movie/:id': 'routerSingleMovie',
      '/random_movie': 'randomMovie',
      '/by_genre': 'byGenre',
      '/searchTitle': 'searchTitle'

    };
  }

  async routerAllMovies(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const count = await Movie.count();
    console.log(count, page);
    const pages = Math.ceil(count, 10 / limit);
    console.log(pages);
    if (page > pages) {
      res.send({ movies: [] });
      return;
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
      // console.log(MoviesJson);

    res.send({ movies: MoviesJson, pages });
  }

  async routerSingleMovie(req, res) {
    const { id } = req.params;
    const moviesJson = await Movie.findAll({
      where: { id },
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });
    const ip = '188.237.151.9'; //  req.ip;
    console.log(req.ip);
    const { data: ticket } = await axios.get(`https://videospider.in/getticket.php?key=gIBI3N1PHUQ0H9mB&secret_key=1ex5mfpsklibrz1rffy0irtubby51f&video_id=${moviesJson.imdbID}&ip=${ip}`);
    moviesJson.Ticket = ticket;
    res.send({ movies: moviesJson[0] });
  }

  async randomMovie(req, res) {
    const limit = parseInt(req.query.number, 10) || 1;
    const MoviesJson = await Movie.findAll({ limit, order: [Sequelize.fn('RAND')], raw: true });
    res.send({ movies: MoviesJson });
  }

  async byGenre(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    // check if there are any params
    if (typeof req.query.genres === 'undefined') {
      res.send({ movies: [] });
    }
    else {
      const genres = req.query.genres.split(',');
      const count = await Movie.count({
        include: [{
          model: Genre,
          where: { id: genres }
        }]
      });
      const pages = Math.ceil(count / limit);
      if (page > pages) {
        res.send({ movies: [] });
        return;
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

      res.send({ movies: foundMovies, pages });
    }
  }

  async searchTitle(req, res) {
    let offset = 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const { query: { title } } = req;
    if (title === undefined) {
      res.send({ movies: [] });
    }
    const count = await Movie.count({
      where: { title: { [Sequelize.Op.substring]: title } }
    });
    const pages = Math.ceil(count / limit);
    if (page > pages) {
      res.send({ movies: [] });
      return;
    }
    offset = limit * (page - 1);

    const MoviesJson = await Movie.findAll(
      {
        where: { title: { [Sequelize.Op.substring]: title } }, raw: true, limit, offset
      }
    );
    res.send({ movies: MoviesJson, pages });
  }
}

module.exports = MovieController;

// app.use('/', indexRouter);
// app.use('/moviegenre', MovieGenre);
// app.use('/genreid', getGenreId);
// app.use('/register', registerUser);
// app.use('/login', loginUser);
// app.use('/finduser', findUser);
// app.use('/allgenres', allGenres);
// app.use('/watchlater', watchLater);
// app.use('/getwatchlater', getwatchlater);
// app.use('/updateUser', updateUser);
// app.use('/checkMovie', checkEligibliness);


// /* GET  genres by movie. */
// MovieGenre.get('/:movieId', async (req, res) => {
//   const { movieId } = req.params;
//   console.log(movieId);
//   const genres = await Movie.findAll({
//     raw: true,
//     attributes: [],
//     where: { id: movieId },
//     include: [{
//       model: Genre,
//       raw: true,
//       attributes: { include: ['title'], exclude: ['id', 'createdAt', 'updatedAt'] }
//     }]
//   });
//   const onlyTitles = genres.map(genre => genre['genres.title']);
//   res.send(onlyTitles);
// });
