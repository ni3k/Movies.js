
const fs = require('fs');
const GenresDb = require('../modeles/genres');
const Movie = require('../modeles/movie');

const rawdata = fs.readFileSync('movies.json');
const Relations = require('../modeles/relationGenreMovie');

const Movies = JSON.parse(rawdata);
Movies.length = 1000;
const insert = async (callback) => {
  await Relations.sync({ force: true });
  for (const movie of Movies) {
    if (movie.genres.length != 0) {
      for (const g of movie.genres) {
        const { title } = movie;
        const idGenre = (await GenresDb.findOne({ where: { title: g } })).id;
        const idMovie = (await Movie.findOne({ where: { title } })).id;

        await Relations.create(
          {
            idGenre,
            idMovie,
          },
        );
      }
    }
  }
  await callback();
};

insert(() => {
  Relations.findAll().then(res => console.log(res));
});
