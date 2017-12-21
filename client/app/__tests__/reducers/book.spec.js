import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import bookReducer from '../../../app/src/reducers/bookReducer';
import {
  addBook,
  getAllBooks,
  borrowBook
} from '../../src/actions/bookAction';


describe('book reducer', () => {
  const initialState = { rows: [], count: 0 };
  it('should return the initial state', () => {
    expect(bookReducer(initialState, {})).toEqual(initialState);
  });
  it('should handle ADD_BOOK', () => {
    const initialState = {
      rows: [{
        author: "Andrew Miles",
        category: "History",
        createdAt: "2017-11-29T11:52:09.353Z",
        description: "I came I saw I conquered.",
        id: 4,
        imagePublicId: "ihrieyf4fw5hccn9spjd",
        imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
        quantity: 45,
        title: "Clash of the Titans",
        updatedAt: "2017-11-29T11:52:09.353Z",
      }],
      count: 1
    };
    const action = bookReducer(initialState, addBook({
      author: "Andrew Miles",
      category: "History",
      createdAt: "2017-11-29T11:52:09.353Z",
      description: "I came I saw I conquered.",
      id: 4,
      imagePublicId: "ihrieyf4fw5hccn9spjd",
      imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
      quantity: 45,
      title: "Clash of the Titans",
      updatedAt: "2017-11-29T11:52:09.353Z",
    }));
    expect(action).toEqual({
      rows:
      [{
        author: 'Andrew Miles',
        category: 'History',
        createdAt: '2017-11-29T11:52:09.353Z',
        description: 'I came I saw I conquered.',
        id: 4,
        imagePublicId: 'ihrieyf4fw5hccn9spjd',
        imageUrl: 'https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg',
        quantity: 45,
        title: 'Clash of the Titans',
        updatedAt: '2017-11-29T11:52:09.353Z'
      },
      {
        author: 'Andrew Miles',
        category: 'History',
        createdAt: '2017-11-29T11:52:09.353Z',
        description: 'I came I saw I conquered.',
        id: 4,
        imagePublicId: 'ihrieyf4fw5hccn9spjd',
        imageUrl: 'https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg',
        quantity: 45,
        title: 'Clash of the Titans',
        updatedAt: '2017-11-29T11:52:09.353Z'
      }],
      count: 2
    });
  });
  it('should handle GET_ALL_BOOK', () => {
    const action = bookReducer(initialState, getAllBooks({
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        },
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        }

      ],
      count: 2
    }));
    expect(action).toEqual({
      rows:
        [{
          author: 'Andrew Miles',
          category: 'History',
          createdAt: '2017-11-29T11:52:09.353Z',
          description: 'I came I saw I conquered.',
          id: 4,
          imagePublicId: 'ihrieyf4fw5hccn9spjd',
          imageUrl: 'https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg',
          quantity: 45,
          title: 'Clash of the Titans',
          updatedAt: '2017-11-29T11:52:09.353Z'
        },
        {
          author: 'Andrew Miles',
          category: 'History',
          createdAt: '2017-11-29T11:52:09.353Z',
          description: 'I came I saw I conquered.',
          id: 4,
          imagePublicId: 'ihrieyf4fw5hccn9spjd',
          imageUrl: 'https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg',
          quantity: 45,
          title: 'Clash of the Titans',
          updatedAt: '2017-11-29T11:52:09.353Z'
        }],
      count: 2
    });
  });
  it('should handle EDIT_BOOK', () => {
    expect(bookReducer({
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        },
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered. I fork repo",
          id: 5,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        }

      ],
      count: 2
    }, {
      type: types.EDIT_BOOK,
      book: {
        author: "Andrew Miles",
        category: "History",
        createdAt: "2017-11-29T11:52:09.353Z",
        description: "The fault in thinking does not lie much in the inadequacy of knowledge but the way we look at it",
        id: 4,
        imagePublicId: "ihrieyf4fw5hccn9spjd",
        imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
        quantity: 45,
        title: "Clash of the Titans",
        updatedAt: "2017-11-29T11:52:09.353Z",
      }
    })).toEqual({
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "The fault in thinking does not lie much in the inadequacy of knowledge but the way we look at it",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        },
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered. I fork repo",
          id: 5,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        }
      ],
      count: 2
    });
  });
  it('should handle BORROW_A_BOOK', () => {
    const initialState = {
      rows: [{
        author: "Andrew Miles",
        category: "History",
        createdAt: "2017-11-29T11:52:09.353Z",
        description: "I came I saw I conquered.",
        id: 5,
        imagePublicId: "ihrieyf4fw5hccn9spjd",
        imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
        quantity: 45,
        title: "Clash of the Titans",
        updatedAt: "2017-11-29T11:52:09.353Z",
      },
      {
        author: "Andrew Miles",
        category: "History",
        createdAt: "2017-11-29T11:52:09.353Z",
        description: "I came I saw I conquered.",
        id: 4,
        imagePublicId: "ihrieyf4fw5hccn9spjd",
        imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
        quantity: 45,
        title: "Clash of the Titans",
        updatedAt: "2017-11-29T11:52:09.353Z",
      }],
      count: 2

    };
    const action = bookReducer(initialState, borrowBook(4));
    expect(action).toEqual({
      count: 2,
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 5,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z"
        },
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 44,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z"
        }]
    });
  });
  it('should handle DELETE_BOOK', () => {
    expect(bookReducer({
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 5,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        },
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 4,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        }

      ],
      count: 2
    }, {
      type: types.DELETE_BOOK,
      id: 4
    })).toEqual({
      rows: [
        {
          author: "Andrew Miles",
          category: "History",
          createdAt: "2017-11-29T11:52:09.353Z",
          description: "I came I saw I conquered.",
          id: 5,
          imagePublicId: "ihrieyf4fw5hccn9spjd",
          imageUrl: "https://res.cloudinary.com/emmanuelandela/image/upload/v1511956323/ihrieyf4fw5hccn9spjd.jpg",
          quantity: 45,
          title: "Clash of the Titans",
          updatedAt: "2017-11-29T11:52:09.353Z",
        }

      ],
      count: 1
    });
  });
});

