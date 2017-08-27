const bcrypt = require('bcrypt');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Emmanuel',
      lastName: 'Ogunbo',
      userName: 'admin',
      membership: 'gold',
      email: 'Ogunbotemilola@yahoo.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10), null),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Temilola',
      lastName: 'Ogunbo',
      userName: 'temmy',
      membership: 'silver',
      email: 'temmyogunbo@gmail.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10)),
      roleId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Joshua',
      lastName: 'Ogunbo',
      userName: 'joshcena',
      membership: 'silver',
      email: 'ogunbojoshua@gmail.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10)),
      roleId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
