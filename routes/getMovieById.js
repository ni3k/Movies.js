const express = require("express");

const router = express.Router();
const Movie = require("../models/movie");

/* GET  movie by id. */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const MoviesJson = await Movie.findOne({ where: { id }, raw: true });

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ movies: [MoviesJson] }));
});

module.exports = router;
