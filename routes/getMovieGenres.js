const express = require("express");

const router = express.Router();

const relationDb = require("../models/relationGenreMovie");

/* GET  genres by movie. */
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const relationsJson = (await relationDb.findAll({
    attributes: ["genreId"],
    raw: true,
    where: { movieId }
  })).map(relation => relation.genreId);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ genres: relationsJson }));
});

module.exports = router;
