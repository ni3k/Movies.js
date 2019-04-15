// 59603cd
import { get } from 'axios';
import Movie from '../models/movie';

import { slice } from './movies.json';

const finalMovies = slice(0, 900);
const insert = async (callback) => {
  await Movie.sync({ force: true });

  const promises = finalMovies.map(async (movie) => {
    const { title, year } = movie;
    const { data } = await get(
      `http://www.omdbapi.com/?apikey=59603cd&t=${encodeURI(
        title.split(' ').join('+')
      )}&y=${encodeURI(year)}`
    );

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
