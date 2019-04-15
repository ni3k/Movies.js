// 59603cd
// b4ddd8cd
// 67169eb
const axios = require('axios');
const fs = require('fs');

const dataMovies = require('./movies.json');

const finalMovies = dataMovies.slice(dataMovies.length - 900, dataMovies.length);

// console.log(finalMovies.length)

const insert = async () => {
  const promises = finalMovies.map(async (movie) => {
    const { title, year } = movie;
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=67169eb&t=${encodeURI(
        title.split(' ').join('+')
      )}&y=${encodeURI(year)}`
    );

    return {
      title,
      year,
      description: data.Plot,
      rating: data.imdbRating,
      poster: data.Poster,
      imdbID: data.imdbID
    };
  });

  const movieBody = await Promise.all(promises);

  const stringifyMovies = JSON.stringify(movieBody);
  fs.writeFile('./generatedMovies.json', stringifyMovies, 'utf8', (e) => {
    console.log(e);
  });
  // await callback();
};

insert();
