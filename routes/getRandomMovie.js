import { Router } from 'express';

const router = Router();
import randomInt from 'random-int';
import { max, findOne } from '../modeles/movie';

/* GET random movie. */
router.get('/', async (req, res) => {
  const topId = await max('id');
  const id = randomInt(1, topId);
  const MoviesJson = await findOne({ where: { id }, raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: [MoviesJson] }));
});

export default router;
