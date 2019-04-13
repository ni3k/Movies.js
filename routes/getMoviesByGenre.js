import { Router } from 'express';

const router = Router();
import { findAndCountAll, findAll } from '../modeles/movie';
import { findAll as _findAll } from '../modeles/relationGenreMovie';


const getMoviesIdByGenres = async (genres) => {
  let movieIds = [];
  await Promise.all(genres.map(async (genre) => {
    const relationObjects = await _findAll(
      {
        raw: true,
        where: { idGenre: parseInt(genre, 10) },
      },
    );
    relationObjects.forEach(relation => movieIds.push(relation.idMovie));
  }));
  movieIds = [...new Set(movieIds)];
  return movieIds;
};


/* GET all movies by genres. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let page = 1;
  const limit = 10;
  let offset = 0;
  if (typeof req.query.page !== 'undefined') page = parseInt(req.query.page, 10);
  // check if there are any params
  if (typeof req.query.genres === 'undefined') res.end(JSON.stringify({ movies: [] }));
  else {
    const { count } = (await findAndCountAll());
    const pages = Math.ceil(count / limit);
    if (page > pages) res.end(JSON.stringify({ movies: [] }));
    offset = limit * (page - 1);

    const genres = req.query.genres.split(',');
    const movieIds = await getMoviesIdByGenres(genres);
    const foundMovies = await findAll(
      {
        where: { id: movieIds },
        limit,
        offset,
      },
    );
    res.end(JSON.stringify({ movies: foundMovies }));
  }
});

export default router;
