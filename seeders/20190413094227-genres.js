'use strict';

const genresArray = require("../dataForDatabase/genres.json");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const GenresJson = genresArray.map(genre => {
      return {
        title: genre
      };
    });
    return queryInterface.bulkInsert("genres", GenresJson, {});
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("genres", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
