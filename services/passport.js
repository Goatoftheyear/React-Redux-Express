const passport = require("passport");
//this 1 below to take strategy out from the module
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
//.js usually don't need to add
// get from keys.js file at config
const keys = require("../config/keys");

//prevent testing dup
//preq is mongoose
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
//console.developers.google.com
//make credentials for info here, or at keys.js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //this is the URL to go to when user grants permission
      //sth like localhost:5000/auth/google/callback
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    //access token will expire after a certain time so need refresh token

    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have a record with given profile ID
        done(null, existingUser);
      }
      //don't have user record with this ID, make a new record via .save()
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
/*  before refractor
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
    */
/* after refractor
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have a record with given profile ID
        done(null, existingUser);
      } else {
        //don't have user record with this ID, make a new record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
*/
