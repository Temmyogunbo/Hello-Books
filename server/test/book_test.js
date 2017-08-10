// Require dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('GET /api/v1/books', () => {
  it('should return all books', (done) => {
    chai.request(app)
      .get('/api/v1/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(5);
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('quantity');
        done();
      });
  });
});
// Test post route
describe('/POST book', () => {
  it('it should not POST a book without quantity field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history'
    };
    chai.request(app)
      .post('/api/v1/books')
      .send(book)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('name').eql('SequelizeValidationError');
        res.body.should.be.a('object');
        done();
      });
  });
});
// Test PUT route
describe('/PUT book', () => {
  it('it should update the desired field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      quantity: 15,
      category: 'history'
    };
    chai.request(app)
      .put('/api/v1/books/6')
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});
