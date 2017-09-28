import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';

const should = chai.should();
chai.use(chaiHttp);

describe('POST /api/v1/users/2/books', () => {
  it('should borrow a book', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 1 })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message').eql('You successfully borrow a book');
        done();
      });
  });
});

describe('POST /api/v1/users/2/books', () => {
  it('should not borrow a book again', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 3 })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.a('object');
        res.body.should.have.property('message').eql('You cannot borrow more than your membership level');
        done();
      });
  });
});
