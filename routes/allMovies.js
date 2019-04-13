import { Router } from 'express';

const router = Router();
import { findAndCountAll, findAll } from '../modeles/movie';

/* GET all movies. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  let page = 1;
  const limit = 10;
  let offset = 0;

  if (typeof req.query.page !== 'undefined') page = parseInt(req.query.page, 10);

  const { count } = (await findAndCountAll());
  const pages = Math.ceil(count / limit);
  if (page > pages) res.end(JSON.stringify({ movies: [] }));
  offset = limit * (page - 1);

  const MoviesJson = await findAll({
    raw: true, limit, offset, order: [['year', 'DESC']],
  });
  console.log(MoviesJson);

  res.end(JSON.stringify({ movies: MoviesJson }));
});

export default router;
