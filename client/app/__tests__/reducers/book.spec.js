import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import bookReducer from '../../../app/src/reducers/bookReducer';

describe('book reducer', () => {
  const initialState = {};
  it('should return the initial state', () => {
    expect(bookReducer(initialState, {})).toEqual(initialState);
  });
  it('should return state', () => {
    expect(bookReducer(undefined, {})).toEqual([]);
  });
  it('should handle ADD_BOOK', () => {
    expect(bookReducer(initialState, {
      type: types.ADD_BOOK,
      book: {
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
    })).toEqual([{
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
    }]);
  });
  it('should handle GET_ALL_BOOK', () => {
    expect(bookReducer(initialState, {
      type: types.GET_ALL_BOOKS,
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
    })).toEqual({
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
          description: "I came I saw I conquered. I fork repo",
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
          description: "The fault in thinking does not lie much in the inadequacy of knowledge but the way we look at it",
          id: 4,
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
    expect(bookReducer({
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

    }, {
      type: types.BORROW_A_BOOK,
      id: 4
    })).toEqual({
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
        quantity: 44,
        title: "Clash of the Titans",
        updatedAt: "2017-11-29T11:52:09.353Z",
      }
      ],
      count: 2
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

