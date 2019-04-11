var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');
/* GET all movies. */
router.get('/', async (req, res, next) => {
    const MoviesJson = await Movies.findAll({raw: true});
    console.log(MoviesJson);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(MoviesJson));
});

module.exports = router;
