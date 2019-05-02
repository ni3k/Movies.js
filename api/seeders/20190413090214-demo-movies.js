const MovieArray = require('../dataForDatabase/generatedMovies.json');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('movie', MovieArray, {}),

  down: queryInterface => queryInterface.bulkDelete('movie', null, {})
};
