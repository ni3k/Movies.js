const express = require("express");

const router = express.Router();
const Genres = require("../models/genres");

/* GET  genres by id. */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const relationsJson = (await Genres.findByPk(id, { attributes: ["title"] }))
    .title;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ genre: relationsJson }));
});

module.exports = router;
