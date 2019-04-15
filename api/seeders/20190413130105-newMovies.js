'use strict';
const MovieArray = require("../dataForDatabase/generatedMovies.1.json");

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("movie", MovieArray, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("movie", null, {});
  }
};
