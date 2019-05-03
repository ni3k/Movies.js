const express = require('express');
const _ = require('lodash');
const axios = require('axios');

const routerAllMovies = express.Router();
const routerSingleMovie = express.Router();
const Movie = require('../models/movie');
const Genre = require('../models/genres');

// util funcs
const filtered = (unfilteredArray) => {
  const titles = {};
  unfilteredArray.forEach((item) => {
    _.forEach(item, (val, key) => {
      const { id } = item;
      if (key.includes('genres.title')) {
        if (!titles[id]) {
          titles[id] = { ...item };
          titles[id].genres = [val];
        }
        else {
          titles[id].genres = [...titles[id].genres, val];
        }
      }
    });
  });
  return titles;
};

/* GET all movies. */
routerAllMovies.get('/', async (req, res) => {
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
    raw: true,
    limit,
    offset,
    order: [['year', 'DESC']],
    include: {
      model: Genre
    }
  });
  // console.log(MoviesJson);

  res.send({ movies: filtered(MoviesJson), pages });
});

/* GET  movie by id. */
routerSingleMovie.get('/:id', async (req, res) => {
  const { id } = req.params;
  const moviesJson = await Movie.findAll({
    where: { id },
    raw: true,
    include: {
      model: Genre,
      through: { attributes: [] }
    }
  });
  const ip = '188.237.151.9'; //  req.ip;
  console.log(req.ip);
  const { data: ticket } = await axios.get(`https://videospider.in/getticket.php?key=gIBI3N1PHUQ0H9mB&secret_key=1ex5mfpsklibrz1rffy0irtubby51f&video_id=${moviesJson.imdbID}&ip=${ip}`);
  moviesJson.Ticket = ticket;
  res.send({ movies: _.values(filtered(moviesJson))[0] });
});


module.exports = {
  routerAllMovies, routerSingleMovie
};
