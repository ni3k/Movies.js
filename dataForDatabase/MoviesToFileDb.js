// 59603cd
import { get } from "axios";
import { writeFile } from "fs";

import { slice } from "./movies.json";

const finalMovies = slice(0, 900);

// console.log(finalMovies.length)

const insert = async () => {
  const promises = finalMovies.map(async movie => {
    const { title, year } = movie;
    const { data } = await get(
      `http://www.omdbapi.com/?apikey=59603cd&t=${encodeURI(
        title.split(" ").join("+")
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

  const stringifyMovies = JSON.stringify(movieBody);
  writeFile("./generatedMovies.json", stringifyMovies, "utf8", e => {
    console.log(e);
  });
  // await callback();
};

insert();
