import { Router } from 'express';

const router = Router();
import { findByPk } from '../modeles/genres';

/* GET  genres by id. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const relationsJson = (await findByPk(id, { attributes: ['title'] })).title;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ genre: relationsJson }));
});

export default router;
