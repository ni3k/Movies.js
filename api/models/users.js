const Sequelize = require('sequelize');
const db = require('../config/database');


const Users = db.define('Users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
},
{
  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

module.exports = Users;
