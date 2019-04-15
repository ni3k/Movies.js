module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('genres');
  }
};
