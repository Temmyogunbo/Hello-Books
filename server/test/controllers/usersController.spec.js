import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';
import samples from '../mockData';

require('dotenv').config();

const should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
  let userToken, adminToken, sampleUserToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(samples.admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(samples.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(samples.user2)
      .end((err, res) => {
        sampleUserToken = res.body.token;
        done();
      });
  });
  describe('/POST users', () => {
    it('it should not post a user without a full name', (done) => {
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
    it('it should not post a user without a userName', (done) => {
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
    it('it should not post a user without an email address', (done) => {
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
    it('it should not post a user without a password', (done) => {
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
    it('Should post a user if the required fields are required', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(samples.sampleUser1)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Should generate a token when the user is created', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(samples.sampleUser3)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should generate a token when the user is successfully authenticated', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(samples.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
    it('Should fail if the user enters incorrect crendentials upon signin', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(samples.user2)
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
          res.body.error.msg.should.eql('Username is required');
          done();
        });
    });
    it('Should fail if the user enters an incorrect password upon signin', (done) => {
      const mockUser = {
        userName: 'enodi',
        password: 'useri21'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.msg.should.eql('Authentication failed. Wrong password.');
          done();
        });
    });
  });
});
