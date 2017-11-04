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
// Test GET route
describe('GET /api/v1/books', () => {
  it('should return all books', (done) => {
    chai.request(app)
      .get('/api/v1/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.length(3);
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('author');
        res.body[0].id.should.be.a('number');
        res.body[0].author.should.be.a('string');
        res.body[0].title.should.eql('Half of a yellow sun');
        res.body[1].title.should.eql('The Pentagon');
        res.body[2].title.should.eql('Alice in Wonderland');
        done();
      });
  });
  it('should return all books by category', (done) => {
    chai.request(app)
      .get('/api/v1/books?category=History')
      .end((err, res) => {
        console.log('-------', res.body.booksByCategory)
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.booksByCategory.should.have.length(1);
        res.body.booksByCategory.should.be.a('array');
        res.body.booksByCategory[0].should.have.property('id');
        res.body.booksByCategory[0].should.have.property('author');
        res.body.booksByCategory[0].id.should.be.a('number');
        res.body.booksByCategory[0].author.should.be.a('string');
        res.body.booksByCategory[0].title.should.eql('Half of a yellow sun');
        res.body.booksByCategory[0].category.should.eql('History');
        res.body.booksByCategory[0].quantity.should.eql(30);
        done();
      });
  });
  it('should return a particular book', (done) => {
    chai.request(app)
      .get('/api/v1/books/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.author.should.eql('Chimanda Adichie');
        res.body.title.should.eql('Half of a yellow sun');
        res.body.category.should.eql('History');
        res.body.imageUrl.should.eql('localhost:4000');
        res.body.quantity.should.eql(30);
        res.body.id.should.eql(1);
        done();
      });
  });
  it('should send a 404 status if no book found', (done) => {
    chai.request(app)
      .get('/api/v1/books/10')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.msg.should.eql('Book not found.');
        done();
      });
  });
});
// Test post route
describe('/POST book', () => {
  it('it should create a book', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'History',
      description: 'Enemy within and enemy  without',
      imageUrl: 'local',
      quantity: 19
    };
    chai.request(app)
      .post('/api/v1/books')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.book.id.should.eql(4);
        res.body.book.title.should.eql('Art of war');
        res.body.book.category.should.eql('History');
        res.body.book.description.should.eql('Enemy within and enemy  without');
        res.body.book.imageUrl.should.eql('local');
        res.body.book.quantity.should.eql(19);
        res.body.book.should.have.property('id');
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('category');
        res.body.book.should.have.property('quantity');
        res.body.book.should.have.property('imageUrl');
        res.body.book.should.have.property('description');
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not create a book without quantity field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history',
      imageUrl: 'http',
      description: 'Enemy of the state'
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
  it('it should not create a book when the category doesn\'t exist', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'history',
      imageUrl: 'http',
      description: 'Enemy of the state',
      quantity: 11
    };
    chai.request(app)
      .post('/api/v1/books')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('msg')
          .eql('Category does not exist. Be sure to check categories table.');
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not create a book when quantity field is not an integer',
    (done) => {
      const book = {
        title: 'Art of war',
        author: 'Edward Luttwark',
        category: 'History',
        description: 'I love war',
        imageUrl: 'theone',
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
});
// Test PUT route
describe('/PUT book', () => {
  it('it should update the desired field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: 'History',
      description: 'Enemy within and enemy  without',
      imageUrl: 'local',
      quantity: 19
    };
    chai.request(app)
      .put('/api/v1/books/2')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not update a book without a category field', (done) => {
    const book = {
      title: 'Art of war',
      author: 'Edward Luttwark',
      category: '',
      description: 'Enemy within and enemy  without',
      imageUrl: 'local',
      quantity: 19
    };
    chai.request(app)
      .put('/api/v1/books/2')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(book)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors[0].should.have.property('param').eql('category');
        res.body.errors[0].should.have
          .property('msg').eql('category is required');
        done();
      });
  });
});


// Test Delete Route
describe('Delete book by Id', () => {
  it('Should not delete book that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/books/300')
      .set('X-ACCESS-TOKEN', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.errors[0].should
          .have.property('msg').eql('Book cannot be found');
        done();
      });
  });
  it('Should not delete book other than admin user', (done) => {
    chai.request(app)
      .delete('/api/v1/books/3')
      .set('X-ACCESS-TOKEN', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.errors[0].should
          .have.property('msg').eql('You are not authorised');
        done();
      });
  });
  it('Should delete book succesfully', (done) => {
    chai.request(app)
      .delete('/api/v1/books/3')
      .set('X-ACCESS-TOKEN', adminToken)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});

// Test category Route
describe('/post category', () => {
  it('Should create a category', (done) => {
    const category = {
      category: 'Romance'
    };
    chai.request(app)
      .post('/api/v1/category')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(category)
      .end((err, res) => {
        res.body.result.should.have.property('id');
        res.body.result.category.should.eql('Romance');
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not create a category if it exists', (done) => {
    const category = {
      category: 'History'
    };
    chai.request(app)
      .post('/api/v1/category')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(category)
      .end((err, res) => {
        res.body.errors[0].should
          .have.property('msg').eql('Cannot create category');
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not create a category without a field', (done) => {
    const category = {
      category: 'History'
    };
    chai.request(app)
      .post('/api/v1/category')
      .set('X-ACCESS-TOKEN', adminToken)
      .send(category)
      .end((err, res) => {
        res.body.errors[0].should
          .have.property('msg').eql('Cannot create category');
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
