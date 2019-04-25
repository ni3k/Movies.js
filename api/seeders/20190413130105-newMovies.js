const MovieArray = require('../dataForDatabase/generatedMovies.1.json');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('movie', MovieArray, {}),

  down: queryInterface => queryInterface.bulkDelete('movie', null, {})
};
