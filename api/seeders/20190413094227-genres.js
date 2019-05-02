'use strict';

const genresArray = require("../dataForDatabase/genres.json");

module.exports = {
  up: queryInterface => {
    const GenresJson = genresArray.map(genre => {
      return {
        title: genre
      };
    });
    return queryInterface.bulkInsert("genres", GenresJson, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("genres", null, {});
  }
};
