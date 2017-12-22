import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';

import app from '../../config/app';
import mockData from '../mockData';

require('dotenv').config();

const should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
  let userToken;
  let adminToken;
  let sampleUserToken;
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
  describe('Given /api/v1/users', () => {
    describe('When I want to add a user', () => {
      it('Then it should not add a user without a full name', (done) => {
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
      it('Then it should not add a user without a userName', (done) => {
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
      it('Then it should not add a user without an email address', (done) => {
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
      it('Then it should not add a user with a wrong email format', (done) => {
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
      it('Then it should not add a user without a password', (done) => {
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
      it(
        'Then it should not add a user with password less than 5 characters',
        (done) => {
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
              res.body.error.msg.should
                .eql('Password must be a mininum of 5 characters');
              done();
            });
        },
      );
      it(
        'Then it should not add a user if the username already exist',
        (done) => {
          const user = {
            fullName: 'james',
            userName: 'temmy',
            email: 'jerk@yahoo.com',
            password: 'emmanuel',
          };
          chai.request(app)
            .post('/api/v1/users/signup')
            .send(user)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.message.should.eql('Username already exist.');
              done();
            });
        },
      );
      it('Then it should not add a user if the email already exist', (done) => {
        const user = {
          fullName: 'james',
          userName: 'simisola',
          email: 'Ogunbotemilola@yahoo.com',
          password: 'emmanuel',
        };
        chai.request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.message.should.eql('Email has been taken.');
            done();
          });
      });
      it('Then it should generate a token when the user is added', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send(mockData.sampleUser3)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            done();
          });
      });
      it(
        'Then it should return the user payload incuding token, boolean, and a success message',
        (done) => {
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
              res.body.message.should.eql('Registration successful');
              res.body.email.should.eql('simi@yahoo.com');
              res.body.userName.should.eql('simisola');
              res.body.membership.should.eql('gold');
              res.body.role.should.eql('users');
              res.body.success.should.eql(true);
              res.body.should.have.property('token');
              done();
            });
        },
      );
    });
  });

  describe('Given /api/v1/users/signin', () => {
    describe('When a user wants to sign in', () => {
      // it(
      //   'Then it should fail if the user enters incorrect crendentials upon signin',
      //   (done) => {
      //     chai.request(app)
      //       .post('/api/v1/users/signin')
      //       .send(mockData.user2)
      //       .end((err, res) => {
      //         res.should.have.status(401);
      //         res.body.should.have.property('message')
      //           .eql('You are not registered');
      //         done();
      //       });
      //   },
      // );
      it(
        'Then it should fail if the user does not enter the username and password fields',
        (done) => {
          const mockUser = {
            userName: '',
            password: 'emmanuel',
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
        },
      );
      it(
        'Then it should fail if the user does not enter password fields',
        (done) => {
          const mockUser = {
            userName: 'temmy',
            password: '',
          };
          chai.request(app)
            .post('/api/v1/users/signin')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.error.param.should.eql('password');
              res.body.error.msg.should.eql('Password is required');
              done();
            });
        },
      );
      it('Then it should fail if the user is not register', (done) => {
        const mockUser = {
          userName: 'enodi',
          password: 'emmanuel',
        };
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(mockUser)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.eql('You are not registered');
            done();
          });
      });
      it(
        'Then it should fail if the user enters an incorrect password',
        (done) => {
          const mockUser = {
            userName: 'temmy',
            password: 'emmanuel123',
          };
          chai.request(app)
            .post('/api/v1/users/signin')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.message.should.eql('Wrong username/password.');
              done();
            });
        },
      );
      it(
        'Then it should not sign in a user with password less than 5 characters',
        (done) => {
          const user = {
            userName: 'temmy',
            password: 'emm',
          };
          chai.request(app)
            .post('/api/v1/users/signin')
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.error.param.should.eql('password');
              res.body.error.msg.should
                .eql('Password must be a mininum of 5 characters');
              done();
            });
        },
      );
      it(
        'Then it should return users payload incuding token and a success message',
        (done) => {
          const mockUser = {
            userName: 'temmy',
            password: 'emmanuel',
          };
          chai.request(app)
            .post('/api/v1/users/signin')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.message.should.eql('You are signed in');
              res.body.email.should.eql('temmyogunbo@gmail.com');
              res.body.userName.should.eql('temmy');
              res.body.membership.should.eql('silver');
              res.body.success.should.eql(true);
              res.body.should.have.property('token');
              done();
            });
        },
      );
    });
  });


  describe('Given /api/v1/users/change-password', () => {
    describe('When I want to change password', () => {
      it(
        ' THen it should not update if old password is not supplied',
        (done) => {
          const user = {
            oldPassword: '',
            newPassword: 'emmanuel',
            userName: 'temmy',

          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.error.param.should.eql('oldPassword');
              res.body.error.msg.should.eql('This field is required');
              done();
            });
        },
      );
      it(
        'Then it should not update if new password is not supplied',
        (done) => {
          const user = {
            oldPassword: 'emmanuel',
            newPassword: '',
            userName: 'temmy',

          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.error.param.should.eql('newPassword');
              res.body.error.msg.should.eql('This field is required');
              done();
            });
        },
      );
      it(
        'Then it should not update password less than 5 characters',
        (done) => {
          const user = {
            oldPassword: 'emmanuel',
            newPassword: 'emm',
            userName: 'temmy',
          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.error.param.should.eql('newPassword');
              res.body.error.msg.should
                .eql('New password must be a mininum of 5 characters');
              done();
            });
        },
      );
      it(
        'Then it should not update password if old password is wrong',
        (done) => {
          const user = {
            oldPassword: 'emmanuel123',
            newPassword: 'emmanuel',
            userName: 'temmy',
          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.message.should.eql('Your old password is incorrect.');
              done();
            });
        },
      );
      it(
        'Then it should not update password if old password is wrong',
        (done) => {
          const user = {
            oldPassword: 'emmanuel123',
            newPassword: 'emmanuel',
            userName: 'temmyyy',
          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.should.have.status(500);
              res.body.message.should.eql('An error occured');
              done();
            });
        },
      );
      it(
        'Then it should update password if both old password and new pasword are correct',
        (done) => {
          const user = {
            oldPassword: 'emmanuel',
            newPassword: 'emmanuel',
            userName: 'temmy',
          };
          chai.request(app)
            .put('/api/v1/users/change-password')
            .set('X-ACCESS-TOKEN', userToken)
            .send(user)
            .end((err, res) => {
              res.body.userName.should.eql(user.userName);
              bcrypt.compareSync(user.oldPassword, res.body.password).should.eql(true);
              res.should.have.status(200);
              res.body.should.have.property('id');
              res.body.should.have.property('fullName');
              res.body.should.have.property('email');
              res.body.should.have.property('role');
              res.body.should.have.property('membership');
              done();
            });
        },
      );
    });
  });
});
