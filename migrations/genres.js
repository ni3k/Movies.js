module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("genres", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable("movie");
  }
};
