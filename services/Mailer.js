const sendgrid = require("@sendgrid/mail");
const helper = sendgrid.mail;
const keys = require("../config/keys");

//setup mailer class, like react component
//helper.Mail takes tons of config and return mailer
//Mailer inherited from Mail object
//react create custom component and extends component base class
//from library
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    //text/html means it gonna be html content
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    //need to register the content to the email
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  //takes in lists of email and format it
  //with help of helper.Email (helper is from sendGrid)
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    //remember super()
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    //iteriate recipients and use personalize obj above
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;
