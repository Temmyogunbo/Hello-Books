import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';
import mockData from '../mockData';

require('dotenv').config();

const should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
  let userToken, adminToken, sampleUserToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(mockData.admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(mockData.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(mockData.user2)
      .end((err, res) => {
        sampleUserToken = res.body.token;
        done();
      });
  });
  describe('/POST users', () => {
    it('it should not create a user without a full name', (done) => {
      const user = {
        fullName: '',
        userName: 'jerk',
        email: 'jerk@yahoo.com',
        password: 'jameskhan',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('fullName');
          res.body.error.msg.should.eql('Fullname is required');
          done();
        });
    });
    it('it should not create a user without a userName', (done) => {
      const user = {
        fullName: 'james',
        userName: '',
        email: 'jerk@yahoo.com',
        password: 'jameskhan',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('userName');
          res.body.error.msg.should.eql('Username is required');  
          done();
        });
    });
    it('it should not create a user without an email address', (done) => {
      const user = {
        fullName: 'james',
        userName: 'jerk',
        email: '',
        password: 'jameskhan',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('email');
          res.body.error.msg.should.eql('Email is required');
          done();
        });
    });
    it('it should not create a user with a wrong email format', (done) => {
      const user = {
        fullName: 'Mark',
        userName: 'jerk',
        email: 'jerkyahoo.com',
        password: 'jameskhan',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('email');
          res.body.error.msg.should.eql('Please put a valid email');
          done();
        });
    });
    it('it should not create a user without a password', (done) => {
      const user = {
        fullName: 'james',
        userName: 'jerk',
        email: 'jerk@yahoo.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('password');
          res.body.error.msg.should.eql('Password is required');
          done();
        });
    });
    it('it should not create a user with password less than 5 characters', (done) => {
      const user = {
        fullName: 'james',
        userName: 'jerk',
        email: 'jerk@yahoo.com',
        password: 'emm',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('password');
          res.body.error.msg.should.eql('Password must be a mininum of 5 characters');
          done();
        });
    });
    it('Should generate a token when the user is created', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.sampleUser3)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should return users payload incuding token, boolean, and a success message', (done) => {
      const user = {
        fullName: 'simi',
        userName: 'simisola',
        email: 'simi@yahoo.com',
        password: 'emmanuel',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.msg.should.eql('Registration successful');
          res.body.email.should.eql('simi@yahoo.com');
          res.body.userName.should.eql('simisola');
          res.body.membership.should.eql('gold');
          res.body.role.should.eql('users');
          res.body.success.should.eql(true);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should generate a token when the user is successfully authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockData.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should fail if the user enters incorrect crendentials upon signin', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockData.user2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('You are not registered');
          done();
        });
    });
    it('Should fail if the user does not enter the required fields upon signin', (done) => {
      const mockUser = {
        userName: '',
        password: ''
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.param.should.eql('userName');
          res.body.error.msg.should.eql('Username/Password is required');
          done();
        });
    });
    it('Should fail if the user enters an incorrect password upon signin', (done) => {
      const mockUser = {
        userName: 'enodi',
        password: 'wrong passsword'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.msg.should.eql('You are not registered');
          done();
        });
    });
    it('Should return users payload incuding token and a success message', (done) => {
      const mockUser = {
        userName: 'temmy',
        password: 'emmanuel'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.eql('You are signed in');
          res.body.email.should.eql('temmyogunbo@gmail.com');
          res.body.userName.should.eql('temmy');
          res.body.membership.should.eql('silver');
          res.body.success.should.eql(true);
          res.body.should.have.property('token');
          done();
        });
    });
  });
});
