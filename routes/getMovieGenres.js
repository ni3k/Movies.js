var express = require('express');
var router = express.Router();
const Movies = require('../modeles/movie');
const Relations = require('../modeles/relationGenreMovie');

/* GET  genres by movie. */
router.get('/:idMovie', async (req, res, next) => {
    const {idMovie} = req.params;
    console.log(idMovie);
    const relationsJson = (await Relations.findAll({attributes: ['idGenre'], raw: true, where: {idMovie} })).map((relation) =>  relation.idGenre);    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({genres: relationsJson }));
});

module.exports = router;