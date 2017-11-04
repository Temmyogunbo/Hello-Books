module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Categories', [{
      category: 'History',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category: 'Programming',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category: 'Mathematics',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
