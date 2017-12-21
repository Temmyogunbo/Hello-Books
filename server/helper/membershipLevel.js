/**
 * Defines user membership level
 *
 * @class MembershipLevel
 */
class MembershipLevel {
/**
 * Checks membership type
 *
 * @static
 * @param {any} membershipType
 * @returns {array} returns object
 * @memberof MembershipLevel
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
export default MembershipLevel;
