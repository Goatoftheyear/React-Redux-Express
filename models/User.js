const mongoose = require("mongoose");
const { Schema } = mongoose;
//mongo can have random data
//this describe all the user
const userSchema = new Schema({
  //googleId will be as String
  googleId: String,
});
//tell mongoose to make new collection
mongoose.model("users", userSchema);
