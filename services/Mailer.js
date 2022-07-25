const sendgrid = require("@sendgrid/mail");
const helper = sendgrid.mail;
const keys = require("../config/keys");

//setup mailer class, like react component
//helper.Mail takes tons of config and return mailer
//Mailer inherited from Mail object
//react create custom component and extends component base class
//from library
class Mailer {
  constructor({ subject, recipients }, content) {
    sendgrid.setApiKey(keys.sendGridKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "testingdump22@gmail.com",
      subject: subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true },
    };
  }

  async send() {
    const response = await sendgrid.send(this.msg);
    return response;
  }
}
// const survey = { title: 'my title', subject: 'Give us feedback!', recipients:'testingdump22@gmail.com', body: 'We would love to hear if you love our services!'}
// axios.post('/api/surveys',survey);
module.exports = Mailer;
