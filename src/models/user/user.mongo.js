const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Please provide a name"],
    minlength: "3",
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      message: "Please provide valid email",
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("user", UserSchema);
