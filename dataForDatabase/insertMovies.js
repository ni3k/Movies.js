
const fs = require('fs');
const db = require('../config/database');
const Movie = require('../modeles/movie');
let rawdata = fs.readFileSync('movies.json');
let Movies = JSON.parse(rawdata);
var i = 0;
Movies.length = 100;
const insert = async (callback) => {
    await Movie.sync({force: true});
    for (const movie of Movies){
        const {title,year,genres} = movie;
        console.log(title,year,genres);
        await Movie.create(
            {title, year}
        );
    }  
    
    await callback();
}
insert(() => {
    Movie.findAll().then(res => console.log(res));
});
