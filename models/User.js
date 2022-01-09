const mongoose = require("mongoose");
//same as const Schema = mongoose.Schema;
//name of the method call Destructuring
//this means that take properties from mongoose
//call schema and named it schema
//so if variable name same as the obj data then
//can destructure
const { Schema } = mongoose;
//mongo can have random data
//this describe all the user
//how to create schema containing obj properties
//properties can be added and remove as you deem fit
const userSchema = new Schema({
  //googleId will be as String
  googleId: String,
});

//tell mongoose to make new collection
//to create a class
//first arugment is the name, this case users
//second arugment is the schema, this case userSchema from
//earlier
//mongo WILL NOT overwrite existing model
//only create if doesn't exists
mongoose.model("users", userSchema);
