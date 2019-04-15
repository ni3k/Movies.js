const Sequelize = require("sequelize");
const db = require("../config/database");

const Genres = db.define(
  "genres",
  {
    title: {
      type: Sequelize.STRING
    }
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
  }
);

module.exports = Genres;
