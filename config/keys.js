//keys.js - figure out what set of credentials to return
//auto in heroku
if (process.env.NODE_ENV === "production") {
  //we are in production - return prod set of keys
  module.exports = require("./prod");
} else {
  //we are in development - return the keys
  module.exports = require("./dev");
}
