const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
//similar to taking from survey.js
const Survey = mongoose.model("surveys");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email: email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer
        .send()
        .then(() => {
          console.log("Message sent");
        })
        .catch((error) => {
          console.log(error.response.body);
        });
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      //update user new amt of credits
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });
};
