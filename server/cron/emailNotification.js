import moment from 'moment';

import model from '../models';
import sendMail from './sendEmail';
import MembershipLevel from '../helper/MembershipLevel';

/**
 * sends email to user
 *
 * @returns {object} returns object
 */
const emailNotifications = () => model.History
  .findAll({
    where: {
      returned: false,
    },
    attributes: ['dueDate', 'borrowedDate'],
    include: [
      { model: model.Book, attributes: ['author', 'title'] },
      { model: model.User, attributes: ['fullName', 'email', 'membership'] },
    ],
  })
  .then((userDetails) => {
    userDetails.map((eachUserDetails) => {
      const numberofDaysBookUsed = moment(new Date())
        .diff(moment(eachUserDetails.borrowedDate), 'days');
      const numberofDaysAllowed = MembershipLevel
        .checkMembership(eachUserDetails.User.membership)[1];
      if (numberofDaysBookUsed > numberofDaysAllowed) {
        sendMail(eachUserDetails);
      }
    });
    return true;
  });
export default emailNotifications;
