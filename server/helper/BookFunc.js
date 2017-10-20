class BookFunc {
  static searchHistory(userId) {
    return {
      where: {
        UserId: userId,
        returned: false
      }
    };
  }
  static updateBook(book, bookId) {
    return [
      {
        quantity: parseInt(book.dataValues.quantity, 10) - 1
      },
      {
        fields: ['quantity'],
        where: {
          id: bookId
        }
      }
    ];
  }
  static createHistory(userId, bookId, days) {
    return {
      UserId: userId,
      BookId: bookId,
      borrowedDate: new Date(),
      dueDate: new Date(new Date().getTime() + (days * 24 * 3600 * 1000))
    };
  }
  static returnMessage(response, code, message) {
    return response.status(code).json({ message });
  }
  static userHasBorrowedBefore(result, size, response) {
    const borrowDay = result[size - 1].dataValues.borrowedDate.getDate();
    const borrowMonth = result[size - 1].dataValues.borrowedDate.getMonth() + 1;
    const borrowYear = result[size - 1].dataValues.borrowedDate.getFullYear();
    const presentDay = new Date().getDate();
    const presentMonth = new Date().getMonth() + 1;
    const presentYear = new Date().getFullYear();
    if (borrowDay !== presentDay || borrowMonth !== presentMonth || borrowYear !== presentYear) {
      return this.returnMessage(response, 400, 'You have to return the previous book');
    }
  }
  static cannotBorrowTheSameBookAgain(result, bookId, size, response) {
    // user wants to borrow the same book again
    for (let i = size; i--;) {
      if (parseInt(bookId, 10) === parseInt(result[i].dataValues.BookId, 10)) {
        return this.returnMessage(reponse, 400, 'You cannot borrow the same book again');
      }
    }
  }
  static checkMembership(membershipType) {
    const numberOfBooksAllowedWithDays = {
      platinum: [8, 10],
      silver: [6, 8],
      gold: [4, 6]
    };
    return numberOfBooksAllowedWithDays[membershipType];
  }
}
export default BookFunc;
