// const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
const admin = {
  email: 'admin@admin.com',
  password: 'adminpassword'
};
const user = {
  email: 'test@test.com',
  password: 'testuser'

};
const user2 = {
  email: 'test@test123.com',
  password: 'test'

};
const sampleUser1 = {
  fullName: 'john doe',
  userName: 'james',
  email: 'john@andela.com',
  password: bcrypt.hashSync('johndeo', bcrypt.genSaltSync(8), null),
  userId: 3
};
const sampleUser2 = {
  fullName: 'full Name',
  userName: 'userName',
  email: 'johne',
  password: bcrypt.hashSync('johnde', bcrypt.genSaltSync(8), null),
  userId: 3
};
const sampleUser3 = {
  fullName: 'james doe',
  userName: 'doe',
  email: 'doe@andela.com',
  password: bcrypt.hashSync('framekey', bcrypt.genSaltSync(8), null),
  userId: 3
};
const sampleUser4 = {
  fullName: 'jane doe',
  userName: 'jane',
  email: 'jane@andela.com',
  password: bcrypt.hashSync('framekelll', bcrypt.genSaltSync(8), null),
  userId: 3,
  roleId: 1
};
const sampleUser5 = {
  fullName: 'jake doe',
  userName: 'doel',
  email: 'jake@andela.com',
  password: bcrypt.hashSync('frameelll', bcrypt.genSaltSync(8), null),
  userId: 3
};


module.exports.sampleUser4 = sampleUser4;
module.exports.admin = admin;
module.exports.user = user;
module.exports.user2 = user2;
module.exports.sampleUser1 = sampleUser1;
module.exports.sampleUser2 = sampleUser2;
module.exports.sampleUser3 = sampleUser3;
module.exports.sampleUser5 = sampleUser5;
