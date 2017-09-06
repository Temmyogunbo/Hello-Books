module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Histories', [{
      UserId: 2,
      BookId: 1,
      dueDate: new Date(new Date().getTime() + (8 * 24 * 3600 * 1000)),
      borrowedDate: new Date(),
      returned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 2,
      BookId: 2,
      dueDate: new Date(new Date().getTime() + (8 * 24 * 3600 * 1000)),
      borrowedDate: new Date(),
      returned: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      BookId: 3,
      dueDate: new Date(new Date().getTime() + (6 * 24 * 3600 * 1000)),
      borrowedDate: new Date(),
      returned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Histories', null, {});
  }
};
