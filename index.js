const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
//other files don't need {name}.js just put {name}
const keys = require("./config/keys");
//return nth so don't need a variable since these have no exports
//need to require these files to get their components
//if not it was treated as non-existant
//kinda like loading other things needed
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Survey");
//is below here cos it uses User which is sth above
//if used below it will cause error
require("./services/passport");
//connect to Mongo DB

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
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
//below works due to require("./routes/authRoutes")
//returns a function
//said function required a parameter which is app
//sth like function(app)
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  //Express will serve up index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
