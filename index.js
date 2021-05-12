const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//return nth so don't need a variable
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(
  cookieSession({
    //how long the cookie exist until it expired
    //all in millseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //for encryption purposes - don't want commit this thing
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
//require files returns a functions immediate calls the function required
//app pass into arrow function
require("./routes/authRoutes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
