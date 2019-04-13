const express = require("express");

const router = express.Router();
const Movie = require("../models/movie");

/* GET all movies. */
router.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let page = 1;
  const limit = 10;
  let offset = 0;

  if (typeof req.query.page !== "undefined")
    page = parseInt(req.query.page, 10);

  const { count } = await Movie.findAndCountAll();
  const pages = Math.ceil(count / limit);
  if (page > pages) res.end(JSON.stringify({ movies: [] }));
  offset = limit * (page - 1);

  const MoviesJson = await Movie.findAll({
    raw: true,
    limit,
    offset,
    order: [["year", "DESC"]]
  });
  console.log(MoviesJson);

  res.end(JSON.stringify({ movies: MoviesJson }));
});

module.exports = router;
