import { Router } from 'express';

const router = Router();
import { findOne } from '../modeles/movie';

/* GET  movie by id. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const MoviesJson = await findOne({ where: { id }, raw: true });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ movies: [MoviesJson] }));
});

export default router;
