const express = require("express");

const router = express.Router();
const Movie = require("../models/movie");
const Relation = require("../models/relationGenreMovie");

const getMoviesIdByGenres = async genres => {
  let movieIds = [];
  await Promise.all(
    genres.map(async genre => {
      const relationObjects = await Relation.findAll({
        raw: true,
        where: { genreId: parseInt(genre, 10) }
      });
      relationObjects.forEach(relation => movieIds.push(relation.movieId));
    })
  );
  movieIds = [...new Set(movieIds)];
  return movieIds;
};

/* GET all movies by genres. */
router.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let page = 1;
  const limit = 10;
  let offset = 0;
  if (typeof req.query.page !== "undefined")
    page = parseInt(req.query.page, 10);
  // check if there are any params
  if (typeof req.query.genres === "undefined")
    res.end(JSON.stringify({ movies: [] }));
  else {
    const { count } = await Movie.findAndCountAll();
    const pages = Math.ceil(count / limit);
    if (page > pages) res.end(JSON.stringify({ movies: [] }));
    offset = limit * (page - 1);

    const genres = req.query.genres.split(",");
    const movieIds = await getMoviesIdByGenres(genres);
    const foundMovies = await Movie.findAll({
      where: { id: movieIds },
      limit,
      offset
    });
    res.end(JSON.stringify({ movies: foundMovies }));
  }
});

module.exports = router;
