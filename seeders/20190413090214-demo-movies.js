'use strict';
const MovieArray = require("../dataForDatabase/generatedMovies.json");

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("movie", MovieArray, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("movie", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
