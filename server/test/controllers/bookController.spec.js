import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../config/app';

const should = chai.should();
chai.use(chaiHttp);
let userToken;
let adminToken;

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
describe('Given /api/v1/books', () => {
  describe('When I want to get books', () => {
    it('Then all books should be returned', (done) => {
      chai.request(app)
        .get('/api/v1/books')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.count.should.eql(4);
          res.body.rows.should.be.a('array');
          res.body.rows[0].should.be.a('object');
          res.body.rows[0].should.have.property('id');
          res.body.rows[0].should.have.property('author');
          res.body.rows[0].id.should.be.a('number');
          res.body.rows[0].author.should.be.a('string');
          res.body.rows[0].title.should.eql('The Pentagon');
          res.body.rows[1].title.should.eql('Alice in Wonderland');
          res.body.rows[2].title.should.eql('Half of a yellow sun');
          done();
        });
    });
    it('Then all books by category should be returned', (done) => {
      chai.request(app)
        .get('/api/v1/books?category=History')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.count.should.eql(2);
          res.body.rows.should.be.a('array');
          res.body.rows[0].should.have.property('id');
          res.body.rows[0].should.have.property('author');
          res.body.rows[0].id.should.be.a('number');
          res.body.rows[0].author.should.be.a('string');
          res.body.rows[0].title.should.eql('Half of a yellow sun');
          res.body.rows[0].category.should.eql('History');
          res.body.rows[0].quantity.should.eql(30);
          done();
        });
    });
    it('Then it should return a particular book', (done) => {
      chai.request(app)
        .get('/api/v1/books/1')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.count.should.eql(1);
          res.body.rows[0].author.should.eql('Chimanda Adichie');
          res.body.rows[0].title.should.eql('Half of a yellow sun');
          res.body.rows[0].category.should.eql('History');
          res.body.rows[0].imageUrl.should.eql('localhost:4000');
          res.body.rows[0].quantity.should.eql(30);
          res.body.rows[0].id.should.eql(1);
          done();
        });
    });
    it('Then it should not return any book if it cannot be found', (done) => {
      chai.request(app)
        .get('/api/v1/books/10')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.errors[0].message.should.eql('No books in the library');
          done();
        });
    });
  });
});
// Test post route
describe('Given /POST /api/v1/books', () => {
  describe('When I want to add a book', () => {
    it('Then it should return the book added', (done) => {
      const book = {
        title: 'The man in the mirror',
        author: 'Edward Luttwark',
        category: 'History',
        description: 'Enemy within and enemy  without',
        imageUrl: 'local',
        imagePublicId: 'andela',
        quantity: 19,
      };
      chai.request(app)
        .post('/api/v1/books')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.book.id.should.eql(5);
          res.body.book.title.should.eql('The man in the mirror');
          res.body.book.category.should.eql('History');
          res.body.book.description.should
            .eql('Enemy within and enemy  without');
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

    it('Then it should not add a book without quantity field', (done) => {
      const book = {
        title: 'Art of war',
        author: 'Edward Luttwark',
        category: 'history',
        imageUrl: 'http',
        imagePublicId: '12344ufufhfjf',
        description: 'Enemy of the state',
      };
      chai.request(app)
        .post('/api/v1/books')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.error.should.have.property('msg')
            .eql('quantity is required');
          res.body.should.be.a('object');
          done();
        });
    });
    it('Then it should not add a book if it already exist', (done) => {
      const book = {
        title: 'The Pentagon',
        author: 'Edward Luttwark',
        category: 'history',
        quantity: 45,
        imageUrl: 'http',
        imagePublicId: '12344ufufhfjf',
        description: 'Enemy of the state',
      };
      chai.request(app)
        .post('/api/v1/books')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.have.eql('Book already exist');
          res.body.should.be.a('object');
          done();
        });
    });
    it(
      'Then it should not add a book when the category doesn\'t exist',
      (done) => {
        const book = {
          title: 'The martial arts',
          author: 'Edward Luttwark',
          category: 'history',
          imageUrl: 'http',
          imagePublicId: '1717373738383kfkf',
          description: 'Enemy of the state',
          quantity: 11,
        };
        chai.request(app)
          .post('/api/v1/books')
          .set('X-ACCESS-TOKEN', adminToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message')
              .eql('Category does not exist.');
            res.body.should.be.a('object');
            done();
          });
      },
    );
    it(
      'Then it should not add a book when quantity field is not an integer',
      (done) => {
        const book = {
          title: 'The only child',
          author: 'Edward Luttwark',
          category: 'History',
          description: 'I love war',
          imageUrl: 'theone',
          imagePublicId: '93i398jriu88484hfu',
          quantity: 'string',
        };
        chai.request(app)
          .post('/api/v1/books')
          .set('X-ACCESS-TOKEN', adminToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.have.property('param');
            res.body.error.should.have.property('msg')
              .eql('quantity must be an integer');
            res.body.should.be.a('object');
            done();
          });
      },
    );
  });
});
// Test PUT route
describe('Given /PUT /api/v1/books', () => {
  describe('When I want to update a book', () => {
    it(
      'THen it should update the desired field if all fields are supplied',
      (done) => {
        const book = {
          title: 'THe beginning of the end',
          author: 'Edward Luttwark',
          category: 'History',
          description: 'Enemy within and enemy  without',
          imageUrl: 'local',
          imagePublicId: '1717373738383kfkf',
          quantity: 19,
        };
        chai.request(app)
          .put('/api/v1/books/1')
          .set('X-ACCESS-TOKEN', adminToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
          });
      },
    );
    it('Then it should not update a book without a category field', (done) => {
      const book = {
        title: 'The one',
        author: 'Edward Luttwark',
        category: '',
        description: 'Enemy within and enemy  without',
        imageUrl: 'local',
        quantity: 19,
        imagePublicId: '1717373738383kfkf',
      };
      chai.request(app)
        .put('/api/v1/books/2')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.have.property('param').eql('category');
          res.body.error.should.have
            .property('msg').eql('category is required');
          done();
        });
    });
    it(
      'Then it should not update a book when category does not exist',
      (done) => {
        const book = {
          title: 'Who am I',
          author: 'Edward Luttwark',
          category: 'Amity',
          description: 'Enemy within and enemy  without',
          imageUrl: 'local',
          imagePublicId: '1717373738383kfkf',
          quantity: 19,
        };
        chai.request(app)
          .put('/api/v1/books/2')
          .set('X-ACCESS-TOKEN', adminToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Category does not exist.');
            done();
          });
      },
    );
    it(
      'Then it should not update a book when the book does not exist',
      (done) => {
        const book = {
          title: 'The fire killer',
          author: 'Edward Luttwark',
          category: 'Amity',
          description: 'Enemy within and enemy  without',
          imageUrl: 'local',
          imagePublicId: '1717373738383kfkf',
          quantity: 19,
        };
        chai.request(app)
          .put('/api/v1/books/20')
          .set('X-ACCESS-TOKEN', adminToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('No such book in the library.');
            done();
          });
      },
    );
  });
});


// Test Delete Route
describe('Given /api/v1/books/:id', () => {
  describe('When I want to delete a book', () => {
    it('Then it should not succeed when book does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/books/300')
        .set('X-ACCESS-TOKEN', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.errors[0].should
            .have.property('message').eql('Book cannot be found');
          done();
        });
    });
    it('Then it should not be deleted if it is not an admin', (done) => {
      chai.request(app)
        .delete('/api/v1/books/3')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.errors[0].should
            .have.property('message').eql('You are not authorised');
          done();
        });
    });
    it('Then it should delete succesfully', (done) => {
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
});

// Test category Route
describe('Given /api/v1/category', () => {
  describe('When I want to add a category', () => {
    it('Then it should return the category added', (done) => {
      const category = {
        category: 'Romance',
      };
      chai.request(app)
        .post('/api/v1/category')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(category)
        .end((err, res) => {
          res.body.should.have.property('id');
          res.body.category.should.eql('Romance');
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Then it should not add a category if it already exists', (done) => {
      const category = {
        category: 'History',
      };
      chai.request(app)
        .post('/api/v1/category')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(category)
        .end((err, res) => {
          res.body.errors[0].message.message
            .should.eql('category must be unique');
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should not create a category without a field', (done) => {
      const category = {
        category: '',
      };
      chai.request(app)
        .post('/api/v1/category')
        .set('X-ACCESS-TOKEN', adminToken)
        .send(category)
        .end((err, res) => {
          res.body.error.should
            .have.property('msg').eql('category is required');
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
// GET category
describe('Given /api/v1/category', () => {
  describe('When I want to get a category', () => {
    it('Then it should return the category available', (done) => {
      chai.request(app)
        .get('/api/v1/category')
        .set('X-ACCESS-TOKEN', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('category');
          res.body[0].category.should.eql('Romance');
          res.body.should.have.length(4);
          done();
        });
    });
  });
});
