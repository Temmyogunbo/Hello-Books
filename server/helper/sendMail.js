const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
/**
 * Send invite mails to users
 * @function sendMail
 * @param {any} req -
 * @param {object} req.params - Contains the user's data
 * @param {any} res -
 * @returns {any} - sends mail
 */
exports.sendMail = (email, notifationType) => {
  console.log('I got here')
  const fromEmail = new helper.Email('hellobooks@andela.com');
  const toEmail = new helper.Email(email);
  const subject = 'HelloBooks';
  const html = `
    <h3>Hi there</h3>
    <p>You have a ${notifationType}. </p><br />
    <p>Follow this link to go online
    <a href="https://emmanuelhellobooks.herokuapp.com">HelloBooks</a>
    </p>
      <p>Copyright &copy; 2017</p>
  `;
  const content = new helper.Content('text/html', html);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, (error, response) => {
    console.log('never made this far')
    if (error) console.log(error);
  });
};
