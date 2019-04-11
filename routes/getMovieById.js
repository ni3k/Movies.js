var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');
/* GET  movie by id. */
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    const MoviesJson = await Movies.findOne({where: {id}, raw: true});
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(MoviesJson));
});

module.exports = router;