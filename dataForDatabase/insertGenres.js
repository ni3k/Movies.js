
const fs = require('fs');
const GenresDb = require('../modeles/genres');

const rawdata = fs.readFileSync('genres.json');
const Genres = JSON.parse(rawdata);


const insert = async (callback) => {
  await GenresDb.sync({ force: true });
  
  for (const genre of Genres) {
    console.log(genre);
    await GenresDb.create(
      { title: genre },
    );
  }

  await callback();
};
insert(() => {
  GenresDb.findAll().then(res => console.log(res));
});
