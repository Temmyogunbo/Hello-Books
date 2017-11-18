module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Role', [{
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
