import moment from 'moment';
import database from '../models';
import sendMail from './sendEmail';
import membershipLevel from '../helper/membershipLevel';

/**
 * sends email to user
 *
 * @returns {object} returns object
 */
const emailNotifications = () => database.History
  .findAll({
    where: {
      returned: false
    },
    attributes: ['dueDate', 'borrowedDate'],
    include: [
      { model: database.Book, attributes: ['author', 'title'] },
      { model: database.User, attributes: ['fullName', 'email', 'membership'] }
    ]
  })
  .then((userDetails) => {
    userDetails.map((eachUserDetails) => {
      const numberofDaysBookUsed = moment(new Date())
        .diff(moment(eachUserDetails.borrowedDate), 'days');
      const numberofDaysAllowed = membershipLevel
        .checkMembership(eachUserDetails.User.membership)[1];
      if (numberofDaysBookUsed > numberofDaysAllowed) {
        sendMail(eachUserDetails);
      }
    });
    return true;
  });
export default emailNotifications;
