const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  hashPass: {
    type: String
  },
  Num: {
    type: Number
  },
  googleId: {  // Field for Google login
    type: String,
    unique: true,
    sparse: true, // Allows for either email/password users or Google users
  }
});

const Register = mongoose.model("Register", RegSchema);

module.exports = Register;
