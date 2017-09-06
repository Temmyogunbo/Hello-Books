
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [{
      title: 'Half of a yellow sun',
      category: 'History',
      author: 'Chimanda Adichie',
      quantity: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Pentagon',
      category: 'History',
      author: 'Edward Luttwark',
      quantity: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Alice in Wonderland',
      category: 'Adventure',
      author: 'Bruno Mars',
      quantity: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
