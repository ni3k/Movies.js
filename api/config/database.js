const Sequelize = require('sequelize');

module.exports = new Sequelize('db', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


//  db.authenticate().then(() => console.log('db connected')).catch(err => console.log(err));
