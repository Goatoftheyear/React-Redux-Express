const passport = require("passport");
//this 1 below to take strategy out from the module
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
//.js usually don't need to add
const keys = require("../config/keys");

const User = mongoose.model("users");
//stuff into cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//get whatever cookie has
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we already have a record with given profile ID
          done(null, existingUser);
        } else {
          //don't have user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
