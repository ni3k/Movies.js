const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('Users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
},
{
  freezeTableName: true
});

module.exports = Users;
