import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../config/app';

const should = chai.should();
let userToken;

chai.use(chaiHttp);
before((done) => {
  chai.request(app)
    .post('/api/v1/users/signin')
    .send({ userName: 'temmy', password: 'emmanuel' })
    .end((err, res) => {
      userToken = res.body.token;
      done();
    });
});

// test POST route for borrow book
describe('Given /api/v1/users/2/books', () => {
  describe('When I want to borrow a book', () => {
    it('Then I should not borrow the same book again', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 2 })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('You cannot borrow the same book again.');
          done();
        });
    });

    it('Then I should not borrow book with an invalid book id', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 'mm' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid book id');
          done();
        });
    });
    it('Then I should not borrow book if it is not available', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 20 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('No such book in the library');
          done();
        });
    });
    it('Then I should not borrow book if it is not available', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 4 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('No more books in the library');
          done();
        });
    });
    it('Then I should not borrow book if my membership type is not known', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: '', bookId: 3 })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('You must declare your membership type.');
          done();
        });
    });
    it('Then I should borrow book if all criterias are met', (done) => {
      chai.request(app)
        .post('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 3 })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.record.should.have.property('returned').eql(false);
          res.body.record.should.have.property('id').eql(5);
          res.body.record.should.have.property('UserId').eql(2);
          res.body.record.should.have.property('BookId').eql(3);
          res.body.message.should.eql('You successfully borrowed a book.');
          res.should.be.a('object');
          done();
        });
    });
  });
});

// Test PUT route for return book
describe('Given /api/v1/users/2/books', () => {
  describe('When I want to return a book', () => {
    it('Then it should be succesful with the book id and a message returned', (done) => {
      chai.request(app)
        .put('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 2 })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.bookReturned[0].should.eql(2);
          res.body.should.have.property('message').eql('You returned a book.');
          done();
        });
    });
    it('Then I should not return a book with an invalid id', (done) => {
      chai.request(app)
        .put('/api/v1/users/2/books')
        .set('X-ACCESS-TOKEN', userToken)
        .send({ membership: 'platinum', bookId: 90 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('No record found');
          done();
        });
    });
  });
});

// Test GET route for user history
describe('Given /api/v1/users/2/history', () => {
  describe('When I want to find a user history', () => {
    it('Then it should return all the records of such user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2/history')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.rows[0].should.have.property('BookId');
          res.body.rows[0].should.have.property('dueDate');
          res.body.rows[0].should.have.property('returned');
          res.body.rows[0].should.have.property('Book');
          res.body.rows[0].Book.should.have.property('author');
          res.body.rows[0].Book.should.have.property('title');
          res.body.rows[0].Book.author.should.eql('Edward Luttwark');
          res.body.rows[0].Book.title.should.eql('The Pentagon');
          res.should.be.a('object');
          done();
        });
    });
    it('Then it should an empty array if no record found', (done) => {
      chai.request(app)
        .get('/api/v1/users/90/history')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('No record found');
          done();
        });
    });
  });
});
