import moment from 'moment';
import db from '../models';
import sendMail from './sendEmail';
import membershipLevel from '../helper/membershipLevel';


const emailNotifications = () => db.History
  .findAll({
    where: {
      returned: false
    },
    attributes: ['dueDate', 'borrowedDate'],
    include: [
      { model: db.Book, attributes: ['author', 'title'] },
      { model: db.User, attributes: ['fullName', 'email', 'membership'] }
    ]
  })
  .then((userDetails) => {
    userDetails.map((eachUserDetails) => {
      const numberofDaysUsed = moment(eachUserDetails.dueDate)
        .diff(moment(eachUserDetails.borrowedDate), 'days');
      const numberofDaysAllowed = membershipLevel
        .checkMembership(eachUserDetails.User.membership)[1];
      if (numberofDaysUsed > numberofDaysAllowed) {
        sendMail(eachUserDetails);
      }
    });
    return true;
  })
  .catch(() => console.log('An error ocurred while sending the mail'));
export default emailNotifications;
