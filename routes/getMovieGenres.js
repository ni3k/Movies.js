import { Router } from 'express';

const router = Router();

import { findAll } from '../modeles/relationGenreMovie';

/* GET  genres by movie. */
router.get('/:idMovie', async (req, res) => {
  const { idMovie } = req.params;
  console.log(idMovie);
  const relationsJson = (await findAll({ attributes: ['idGenre'], raw: true, where: { idMovie } })).map(relation => relation.idGenre);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ genres: relationsJson }));
});

export default router;
