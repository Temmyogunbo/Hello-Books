const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'Emmanuel Ogunbo',
      userName: 'admin',
      membership: 'gold',
      email: 'Ogunbotemilola@yahoo.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10), null),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      fullName: 'Temilola Olushola',
      userName: 'temmy',
      membership: 'silver',
      email: 'temmyogunbo@gmail.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10)),
      role: 'users',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      fullName: 'Enodi Audu',
      userName: 'kill',
      membership: 'platinum',
      email: 'enodiaudu@gmail.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10)),
      role: 'users',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: 'Joshua Ogunbo',
      userName: 'joshcena',
      membership: 'silver',
      email: 'ogunbojoshua@gmail.com',
      password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(10)),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
