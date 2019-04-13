import { STRING } from "sequelize";
import { define } from "../config/database";

const Genres = define("genres", {
  title: {
    type: STRING
  }
}, {
  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

export default Genres;
