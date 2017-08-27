// Import dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../config/app';

const should = chai.should();
chai.use(chaiHttp);
let userToken, adminToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/users/signin')
    .send({ userName: 'admin', password: 'emmanuel' })
    .end((err, res) => {
      adminToken = res.body.token;
      done();
    });
});
before((done) => {
  chai.request(app)
    .post('/api/v1/users/signin')
    .send({ userName: 'temmy', password: 'emmanuel' })
    .end((err, res) => {
      userToken = res.body.token;
      done();
    });
});

describe('GET /api/v1/books', () => {
  it('should return all books', (done) => {
    chai.request(app)
      .get('/api/v1/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
});
// Test post route
describe('/POST book', () => {
  it('it should POST a book', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history',
      quantity: 19
    };
    chai.request(app)
      .post('/api/v1/books')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('title').eql('Art of war');
        res.body.should.have.property('author').eql('Edward Luttwark');
        res.body.should.have.property('category').eql('history');
        res.body.should.have.property('quantity').eql(19);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST a book without quantity field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history'
    };
    chai.request(app)
      .post('/api/v1/books')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('errors');
        res.body.errors[0].should.have.property('param').eql('quantity');
        res.body.errors.should.be.a('array');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST a book when quantity field is not an integer',
    (done) => {
      const book = {
        title: 'Art of war',
        author: 'Edward Luttwark',
        category: 'history',
        quantity: 'string'
      };
      chai.request(app)
        .post('/api/v1/books')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('msg')
            .eql('quantity must be an integer');
          res.body.errors.should.be.a('array');
          res.body.should.be.a('object');
          done();
        });
    });
  it('it should not POST a book when user is not admin', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history',
      quantity: 10
    };
    chai.request(app)
      .post('/api/v1/books')
      .set('X-ACCESS-TOKEN', userToken)
      .send(book)
      .end((err, res) => {
        res.body.should.have.property('error');
        res.body.should.have.property('message').eql('You are not authorised');
        res.body.should.be.a('object');
        done();
      });
  });
});
// Test PUT route
describe('/PUT book', () => {
  it('it should update the desired field', (done) => {
    const book = {
      title: 'The Pentagon',
      category: 'History',
      author: 'Edward Luttwark and Saul Singher',
      quantity: 90,
    };
    chai.request(app)
      .put('/api/v1/books/2')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You updated a book');
        done();
      });
  });
  it('it should not update in case of a missing field', (done) => {
    const book = {
      title: 'The Pentagon',
      category: 'History',
      author: 'Edward Luttwark and Saul Singher'
    };
    chai.request(app)
      .put('/api/v1/books/2')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid details');
        done();
      });
  });
  it('it should update book for user other han admin', (done) => {
    const book = {
      title: 'The Pentagon',
      category: 'History',
      author: 'Edward Luttwark and Saul Singher',
      quantity: 90,
    };
    chai.request(app)
      .put('/api/v1/books/2')
      .set('X-ACCESS-TOKEN', userToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You are not authorised');
        done();
      });
  });
});

describe('Delete book by Id', () => {
  it('Should not delete book that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/books/300')
      .set('X-ACCESS-TOKEN', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Book cannot be found');
        done();
      });
  });
  it('Should not delete book other than admin user', (done) => {
    chai.request(app)
      .delete('/api/v1/books/3')
      .set('X-ACCESS-TOKEN', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You are not authorised');
        done();
      });
  });
  it('Should delete book succesfully', (done) => {
    chai.request(app)
      .delete('/api/v1/books/3')
      .set('X-ACCESS-TOKEN', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('Book successfully deleted!');
        done();
      });
  });
});
