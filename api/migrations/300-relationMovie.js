module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'movie', // name of Source model
    'GenreId', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'genres', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'movie', // name of Source model
    'GenreId' // key we want to remove
  )
};
