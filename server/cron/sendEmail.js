const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
/**
 * Send emails notifications to users
 * @function sendMail
 * @param {object} userDetails - Contains the user's data
 * @returns {any} - sends mail
 */
const sendMail = (userDetails) => {
  const fromEmail = new helper.Email('hellobooks@andela.com');
  const toEmail = new helper.Email(userDetails.User.email);
  const subject = 'HelloBooks';
  const html = `
    <h3>Dear ${userDetails.User.fullName}</h3>
    <p>You have been charged an additional amount of money for not returning the book
    <p> <b>Title: ${userDetails.Book.title}</b></P>
    <p><b>Author: ${userDetails.Book.author}</b></p></br>
    <p>on time. </p>
    </p><br />
    <p>Thank you for your usual cooperation.</p>
  <p><a href="https://emmanuelhellobooks.herokuapp.com">HelloBooks</a></p>
  
      <p>Copyright &copy; 2017 emmanuelhellobooks library</p>
  `;
  const content = new helper.Content('text/html', html);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, (error, response) => {
    if (error) console.log(error);
  });
};
export default sendMail;
