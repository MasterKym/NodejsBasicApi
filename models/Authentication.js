const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },

  // How many skills a freelancer  can compete for

  date: {
    type: Date,
    default: Date.now
  }
});

// Export  Authentication
const Registration = (module.exports = mongoose.model(
  "authentication",
  registrationSchema
));
