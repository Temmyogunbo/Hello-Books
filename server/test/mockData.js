import bcrypt from 'bcrypt';
const admin = {
  userName: 'admin',
  password: 'emmanuel'
};
const user = {
  userName: 'temmy',
  password: 'emmanuel'

};
const user2 = {
  userName: 'enodi1000',
  password: 'emmanuel'

};
const sampleUser1 = {
  fullName: 'john doe',
  userName: 'james',
  email: 'john@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null)
};
const sampleUser2 = {
  fullName: 'full Name',
  userName: 'userName',
  email: 'johne',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
};
const sampleUser3 = {
  fullName: 'james doe',
  userName: 'doe',
  email: 'doe@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
};
const sampleUser4 = {
  fullName: 'jane doe',
  userName: 'jane',
  email: 'jane@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
};
const sampleUser5 = {
  fullName: 'jake doe',
  userName: 'doel',
  email: 'jake@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null)
};
export default {
  user,
  user2,
  admin,
  sampleUser1,
  sampleUser2,
  sampleUser3,
  sampleUser4,
  sampleUser5
};

