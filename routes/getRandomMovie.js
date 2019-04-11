var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');
const randomInt = require('random-int');

/* GET  movie by id. */
router.get('/', async (req, res, next) => {
    const topId = await Movies.max('id');
    const id = randomInt(1,topId);
    const MoviesJson = await Movies.findOne({where: {id}, raw: true});
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(MoviesJson));
});

module.exports = router;