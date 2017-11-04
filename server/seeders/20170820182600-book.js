module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Half of a yellow sun',
      category: 'History',
      description: 'Story of the Igbos in Eastern part of Nigeria, struggling to be recognized',
      author: 'Chimanda Adichie',
      quantity: 30,
      imageUrl: 'localhost:4000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Pentagon',
      category: 'Mathematics',
      author: 'Edward Luttwark',
      description: 'A book written by a millitar historian',
      quantity: 30,
      imageUrl: 'localhost:3000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Alice in Wonderland',
      category: 'Programming',
      author: 'Bruno Mars',
      description: 'A fictitious story of a man named Alice trying to make the most decision of is life.',
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
