

module.exports = (sequelize, DataTypes) => {
  const archivedMovies = sequelize.define('archivedMovies', {
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  archivedMovies.associate = function (models) {
    // associations can be defined here
  };
  return archivedMovies;
};
