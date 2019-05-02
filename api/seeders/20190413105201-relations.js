'use strict';

const relations = require("../dataForDatabase/generatedRelations.json");

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("relations", relations, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("relations", null, {});
  }
};
