const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  //title is title of the campaign
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  //nice features to have
  dateSent: Date,
  lastResponded: Date,
});

//load this up to mongoose library
mongoose.model("surveys", surveySchema);
