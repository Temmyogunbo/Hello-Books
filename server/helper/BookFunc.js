/**
 *
 *
 * @class BookFunc
 */
class BookFunc {
  /**
   *
   *
   * @static
   * @param {any} membershipType
   * @returns  {object} number of allowed withy days
   * @memberof BookFunc
   */
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
