/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const Router = require('../classes/RouteCreator');

const Movie = require('../models/movie');
const Genre = require('../models/genres');

/**
 * Represents GenreController.
 * @constructor
 */
class GenreController extends Router {
  /** replaces the function services from Roter class (classes/RouteCreator) */
  get services() {
    return {
      '/moviegenre/:movieId': 'movieGenre',
      '/genreid/:id': 'getGenreId',
      '/allgenres': 'allGenres'
    };
  }

  /** /allgenres -> returns all genres from the db with attributes title and id */
  async allGenres(req, res) {
    const relationsJson = (await Genre.findAll({ attributes: ['title', 'id'] }));
    res.send({ genre: relationsJson });
  }

  /** /genreid/:id -> returns the title of the genre by id (optional function) */
  async getGenreId(req, res) {
    const { id } = req.params;
    console.log(id);
    const relationsJson = (await Genre.findByPk(id, { attributes: ['title'] }))
      .title;
    res.send({ genre: relationsJson });
  }

  /** /moviegenre/:movieId -> returns the movie genres by movie id (optional function) */
  async movieGenre(req, res) {
    const { movieId } = req.params;
    console.log(movieId);
    const genres = await Movie.findAll({
      raw: true,
      attributes: [],
      where: { id: movieId },
      include: [{
        model: Genre,
        raw: true,
        attributes: { include: ['title'], exclude: ['id', 'createdAt', 'updatedAt'] }
      }]
    });
    const onlyTitles = genres.map(genre => genre['genres.title']);
    res.send(onlyTitles);
  }
}

module.exports = GenreController;
