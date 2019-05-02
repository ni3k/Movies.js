const fs = require('fs');
const GenresDb = require('../models/genres');
const Movie = require('../models/movie');

const rawdata = fs.readFileSync('movies.json');

const Movies = JSON.parse(rawdata);
const finalMovies = Movies.slice(Movies.length - 900, Movies.length);
const insert = async () => {
  // await Relations.sync({ force: true });

  const allGenres = await GenresDb.findAll({ raw: true });
  const promise = finalMovies.map(async (dataMovie) => {
    const { title, genres } = dataMovie;
    const { id: movieId } = await Movie.findOne({ where: { title } });
    const relation = await Promise.all(
      genres.map(async (genre) => {
        const { id: genreId } = allGenres.find(g => g.title === genre);
        return { movieId, genreId };
      })
    );
    if (relation.length !== 0) return relation;
    return [{ movieId, genreId: -1 }];
    // console.log(relation);
  });
  const data = await Promise.all(promise);
  // eslint-disable-next-line prefer-spread
  const mergedData = [].concat.apply([], data);
  await console.log(mergedData);
  fs.writeFile(
    './generatedRelations.json',
    JSON.stringify(mergedData),
    'utf8',
    (e) => {
      console.log(e);
    }
  );
};
insert();
