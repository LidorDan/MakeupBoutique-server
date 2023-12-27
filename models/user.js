const mongoose = require("mongoose");
const user = new mongoose.Schema({

  is_admin: {
    type: Boolean,
    required: true,
    default: 1,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

});


const User = mongoose.model('users', user);
module.exports = User;
