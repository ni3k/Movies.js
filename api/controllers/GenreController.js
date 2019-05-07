/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
const Router = require('../classes/RouteCreator');

const Movie = require('../models/movie');
const Genre = require('../models/genres');

class GenreController extends Router {
  get services() {
    return {
      '/moviegenre/:movieId': 'movieGenre',
      '/genreid/:id': 'getGenreId',
      '/allgenres': 'allGenres'
    };
  }

  async allGenres(req, res) {
    const relationsJson = (await Genre.findAll({ attributes: ['title', 'id'] }));
    res.send({ genre: relationsJson });
  }

  async getGenreId(req, res) {
    const { id } = req.params;
    console.log(id);
    const relationsJson = (await Genre.findByPk(id, { attributes: ['title'] }))
      .title;
    res.send({ genre: relationsJson });
  }

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
