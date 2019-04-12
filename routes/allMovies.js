var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');

/* GET all movies. */
router.get('/', async (req, res, next) => {

    res.setHeader('Content-Type', 'application/json');

    let page = 1;
    const limit = 10;
    let offset = 0;

    if (typeof req.query.page !== 'undefined')
        page = parseInt(req.query.page);
    
    const { count } = (await Movies.findAndCountAll())
    let pages = Math.ceil(count / limit)
    if (page > pages)
        res.end(JSON.stringify({ movies: [] }));
    offset = limit * (page - 1);

    const MoviesJson = await Movies.findAll({ raw: true, limit, offset });
    console.log(MoviesJson);
    
    res.end(JSON.stringify({ movies: MoviesJson }));
    
    
    
});

module.exports = router;
