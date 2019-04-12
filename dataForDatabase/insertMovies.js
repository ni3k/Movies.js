// 59603cd
const axios = require('axios');
const Movie = require('../modeles/movie');

const movies = require('./movies.json');

const finalMovies = movies.slice(0, 900);
const insert = async (callback) => {
  await Movie.sync({ force: true });

  const promises = finalMovies.map(async (movie) => {
    const { title, year } = movie;
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=59603cd&t=${encodeURI(title.split(' ').join('+'))}&y=${encodeURI(year)}`);

    return {
      title,
      year,
      description: data.Plot,
      rating: data.imdbRating,
      poster: data.Poster
    };
  });

  const movieBody = await Promise.all(promises);
  await Movie.bulkCreate(movieBody);

  await callback();
};
insert(() => {
  Movie.findAll().then(res => console.log(res));
});
