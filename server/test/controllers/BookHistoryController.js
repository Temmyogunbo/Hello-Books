import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';

const should = chai.should();
chai.use(chaiHttp);

// test POST route for borrow book
describe('POST /api/v1/users/2/books', () => {
  it('should borrow book', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 2 })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('You successfully borrow a book.');
        done();
      });
  });
  it('should not borrow the same book again', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 10 })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('No such book in the library');
        done();
      });
  });
  it('should not borrow book with an invalid id', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 'mm' })
      .end((err, res) => {
        res.should.have.status(500);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('Something went wrong.');
        done();
      });
  });
  it('should not borrow the same book again', (done) => {
    chai.request(app)
      .post('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 1 })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('You cannot borrow the same book again.');
        done();
      });
  });
});

// Test PUT route for return book 
describe('PUT /api/v1/users/2/books', () => {
  it('should return book', (done) => {
    chai.request(app)
      .put('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 2 })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('You returned a book.');
        done();
      });
  });
  it('should not return a book with an invalid id', (done) => {
    chai.request(app)
      .put('/api/v1/users/2/books')
      .send({ membership: 'platinum', bookId: 'mmm' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('msg').eql('Something went wrong.');
        done();
      });
  });
});

// Test GET route for user history 
describe('GET /api/v1/users/2/history', () => {
  it('should return user history', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/history')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.have.property('BookId');
        res.body[0].should.have.property('dueDate');
        res.body[0].should.have.property('returned');
        res.body[0].should.have.property('Book');
        res.body[0].Book.should.have.property('author');
        res.body[0].Book.should.have.property('title');
        res.body[0].Book.author.should.eql('Chimanda Adichie');
        res.body[0].Book.title.should.eql('Half of a yellow sun');
        res.should.be.a('object');
        done();
      });
  });
});
