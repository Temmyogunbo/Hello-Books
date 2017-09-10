process.env.NODE_ENV = 'test';
const chai = require('chai');
require('dotenv').config();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../config/server');
const samples = require('./mockdata');

chai.use(chaiHttp);
let userToken, adminToken, sampleUserToken;
describe('Users', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({ userName: 'admin', password: 'emmanuel' })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
  });
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send(samples.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({ email: 'mayor@andela.com', password: 'jamestest' })
      .end((err, res) => {
        sampleUserToken  = res.body.token;
        done();
      })
  })
  describe('/POST users', () => {
    it('it should not post a user without a full name', (done) => {
      const user = {
        fullName: '',
        userName: 'jerk',
        email: 'jerk@yahoo.com',
        password: 'jameskhan',
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('fullName').to.equal('This Field is Required');
          done();
        });
    });
    it('it should not post a user without a userName', (done) => {
      const user = {
        fullName: 'james',
        userName: '',
        email: 'jerk@yahoo.com',
        password: 'jameskhan',
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('userName').to.equal('This Field is Required');
          done();
        });
    });
    it('it should not post a user without an email address', (done) => {
      const user = {
        fullName: 'james',
        userName: 'jerk',
        email: '',
        password: 'jameskhan',
      };
      chai.request(server)
        .post'/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('email').to.equal('This Field is Required');
          done();
        });
    });
   it('it should not post a user without a password', (done) => {
      const user = {
        fullName: 'james',
        userName: 'jerk',
        email: 'jerk@yahoo.com',
        password: '',
      };
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('password').to.equal('This Field is Required');
          done();
        });
    });
    it('Should post a user if the required fields are required', (done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(samples.sampleUser1)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should generate a token when the user is created', (done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(samples.sampleUser3)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Should fail if a user enters an invalid email address', (done) => {
      chai.request(server)
        .post('/api/v1/users/signin')
        .send(samples.sampleUser2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('email').to.equal('Email is not rightly formatted');
          done();
        });
    });
    it('Should fail if a user trys to create an admin role', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(samples.sampleUser4)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('An admin role cannot be created');
          done();
        });
    });
    it('Should generate a token when the user is successfully authenticated', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send(samples.user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('Should fail if the user enters incorrect crendentials upon login', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send(samples.user2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal('This account does not exist');
          done();
        });
    });
    it('Should fail if the user does not enter the required fields upon login', (done) => {
      const mockUser = {
        email: '',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/users/login')
        .send(mockUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('email').to.equal('This field is required');
          done();
        });
    });
    it('Should fail if the user does not enter the required fields upon login', (done) => {
      const mockUser = {
        email: 'test',
        password: 'user'
      };
      chai.request(server)
        .post('/api/v1/users/login')
        .send(mockUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('email').to.equal('Email is invalid');
          done();
        });
    });
    it('Should fail if the user enters an incorrect password upon login', (done) => {
      const mockUser = {
        email: 'test@test.com',
        password: 'useri21'
      };
      chai.request(server)
        .post('/api/v1/users/login')
        .send(mockUser)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('password').to.equal('Password is Invalid');
          done();
        });
    });
  });
  describe('/GET Users', () => {
    it('Should get all users if the user is an admin ', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user[1]).to.have.property('fullName').to.equal('jame doe');
          expect(res.body.user[1]).to.have.property('userName').to.equal('testdoe');
          expect(res.body.user[1]).to.have.property('id').to.equal(3);
          done();
        });
    });
    it('Should fail to get all users if the user has no admin access ', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized');
          done();
        });
    });
    it('Should fail to get all users if no token was provided', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('No token provided.');
          done();
        });
    });
    it('Should get all users with correct limit and offset as a query', (done) => {
      const limit = 1;
      const offset = 0;
      chai.request(server)
        .get(`/api/v1/users?limit=${limit}&offset=${offset}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user[0]).to.have.property('fullName').to.equal('test user');
          expect(res.body.user[0]).to.have.property('userName').to.equal('user');
          done();
        });
    });
  });
  describe('/GET/:id User', () => {
    it('Should get a user by id if the user is an admin', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).be.a('array');
          expect(res.body[0]).to.have.property('fullName').to.equal('test user');
          expect(res.body[0]).to.have.property('id').to.equal(2);
          expect(res.body[0]).to.have.property('userName').to.equal('user');
          expect(res.body[0]).to.have.property('email').to.equal('test@test.com');
          expect(res.body[0]).to.have.property('roleId').to.equal(2);
          done();
        });
    });
    it('Should get the user if the requested user is the current user', (done) => {
      const id = 2;
      chai.request(server)
        .get(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).be.a('array');
          expect(res.body[0]).to.have.property('fullName').to.equal('test user');
          expect(res.body[0]).to.have.property('id').to.equal(2);
          expect(res.body[0]).to.have.property('userName').to.equal('user');
          expect(res.body[0]).to.have.property('email').to.equal('test@test.com');
          expect(res.body[0]).to.have.property('roleId').to.equal(2);
          done();
        });
    });
    it('Should fail to get a user by id if an invalid input is entered', (done) => {
      const id = 'fddjsdcdjn';
      chai.request(server)
        .get(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('message').to.equal(`invalid input syntax for integer: "${id}"`);
          done();
        });
    });
    it('should fail to get the user if the requester is not the owner', (done) => {
      const id = 2;
      chai.request(server)
        .get(`api/users/${id}`)
        .set({'authorization': sampleUserToken})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').to.equal('Unauthorized access');
        });
        done();
    })
    it('Should fail to get a user by id if the user does not exist', (done) => {
      const id = 250;
      chai.request(server)
        .get(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('User not found');
          done();
        });
    });
    it('Should fail to get a user by id if the id is out of range', (done) => {
      const id = 500000000000000000;
      chai.request(server)
        .get(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('message').to.equal(`value "${id}" is out of range for type integer`);
          done();
        });
    });
  });
  describe('/PUT/:id, User', () => {
    it('Should update a user`s full name by id if the user has the same id',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ fullName: 'jake doe' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('fullName').to.equal('jake doe');
          done();
        });
      });
    it('Should fail to update a user`s password if the user current password is not provided', (done) => {
      const id = 2;
      const password = 'johnjames';
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ password: 'johnjames' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have
            .property('message').to.equal('Please enter your current password');
          done();
        });
    });
    it('Should fail to update a user`s password if the user current password is invalid', (done) => {
      const id = 2;
      const user = {
        oldPassword: 'test',
        password: 'johnjames'
      }
       chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have
            .property('message').to.equal('Invalid password');
          done();
        });
    })
    it('Should update a user`s email by id if the user has the same id', (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ email: 'jakedoe@andela.com' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('email').to.equal('jakedoe@andela.com');
          done();
        });
    });
    it('Should update a user`s email by id if the user has the same id',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ email: 'jakedoe@andela.com' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('email').to.equal('jakedoe@andela.com');
          done();
        });
    });
    it('Should update a user`s username by id if the user has the same id',
     (done) => {
      const id = 2;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ userName: 'jakedoe12' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id').to.equal(2);
          expect(res.body).to.have.property('userName').to.equal('jakedoe12');
          done();
        });
    });
    it('Should fail to update a user`s details if the user does not have the same user id', (done) => {
      const id = 3;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ email: 'jakedoe@andela.com' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to access this user');
          done();
        });
    });
    it('Should fail to update a user`s details if the user enters an invalid user id', (done) => {
      const id = 2302;
      chai.request(server)
        .put(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .send({ email: 'jakedoe@andela.com' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to access this user');
          done();
        });
    });
  });
  describe('DELETE/:id Users', () => {
    it('Should delete a user given the user has admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
    it('Should fail delete a user given the user has no admin access', (done) => {
      const id = 3;
      chai.request(server)
        .delete(`/api/v1/users/${id}`)
        .set({ 'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message').to.equal('You are not authorized to access this field');
          done();
        });
    });
    it('Should fail delete a user given the user doesn`t exist', (done) => {
      const id = 23;
      chai.request(server)
        .delete(`/api/v1/users/${id}`)
        .set({ 'authorization': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message').to.equal('User not found');
          done();
        });
    });
  });
  describe('/SEARCH/users/?q={name}', () => {
     it('Should return an error if no querystring is provided', () => {
       const query='';
       chai.request(server)
        .get(`/api/v1/search/users/?q=${query}`)
        .set({'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').to.equal('Invalid search input')
        });
     });
       it('Should return a search list response of the required search input', () => {
       const query='jame';
       chai.request(server)
        .get(`/api/v1/search/users/?q=${query}`)
        .set({'authorization': userToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('fullName').to.equal('jame doe');
          expect(res.body).to.have.property('userName').to.equal('testdoe');
        });
     });
   });

});
