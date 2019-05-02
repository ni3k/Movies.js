const express = require('express');
const axios = require('axios');

const router = express.Router();
const Movie = require('../models/movie');

/* GET  movie by id. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const moviesJson = await Movie.findOne({ where: { id }, raw: true });
  const ip = '188.237.151.9'; //  req.ip;
  console.log(req.ip);
  const { data: ticket } = await axios.get(`https://videospider.in/getticket.php?key=gIBI3N1PHUQ0H9mB&secret_key=1ex5mfpsklibrz1rffy0irtubby51f&video_id=${moviesJson.imdbID}&ip=${ip}`);
  moviesJson.Ticket = ticket;
  res.send({ movies: [moviesJson] });
});

module.exports = router;
