module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Half of a yellow sun',
      category: 'History',
      author: 'Chimanda Adichie',
      quantity: 30,
      imageUrl: 'localhost:4000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Pentagon',
      category: 'History',
      author: 'Edward Luttwark',
      quantity: 30,
      imageUrl: 'localhost:3000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Alice in Wonderland',
      category: 'Adventure',
      author: 'Bruno Mars',
      quantity: 30,
      imageUrl: 'localhost:5000',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
