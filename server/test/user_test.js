// Require dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
describe('POST should sign in a user', () => {
  it('should return an object containing token and true as values', (done) => {
    const user = {
      userName: 'Temilola',
      password: 'emmanuel'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('token');
        done();
      });
  });
});

// Test for wrong password
chai.use(chaiHttp);
describe('POST should sign in a user', () => {
  it('should return an object containing token and true as values', (done) => {
    const user = {
      userName: 'Temilola',
      password: ''
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done();
      });
  });
});
// Test route for signup
describe('POST should sign in a user', () => {
  it('should return an object containing token and true as values', (done) => {
    const user = {
      userName: 'Temilola',
      password: 'emmanuel',
      membership: 'platinum',
      firstName: 'Adeaga',
      lastName: 'Anjola',
      email: 'anjola@gmail.com.'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('token');
        done();
      });
  });
});