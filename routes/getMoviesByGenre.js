var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');
const Relations = require('../modeles/relationGenreMovie');


const getMoviesIdByGenres = async (genres) => {
    
    let movieIds = [];
    await Promise.all(genres.map(async genre =>  {
        const relationObjects = await Relations.findAll
        (
            {
                raw: true, 
                where: { idGenre: parseInt(genre) }
            }
        );
        relationObjects.forEach(relation => movieIds.push(relation.idMovie));
        
    }));
    movieIds = [...new Set(movieIds)];
    return movieIds;    
}

const getList = async (listOfIds) => {
    const foundMovies = await Promise.all(listOfIds.map(async movieId => {
        return (await Movies.findByPk(movieId, {raw: true}));
    }))
    return foundMovies;
}

/* GET all movies. */
router.get('/', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // check if there are any params
    if (typeof req.query.genres === 'undefined')
        res.end(JSON.stringify([]))
    else {
        const genres = req.query.genres.split(',');
        const movieIds = await getMoviesIdByGenres(genres);
        const foundMovies = await getList(movieIds);
        res.end(JSON.stringify(foundMovies));
    }
});

module.exports = router;
