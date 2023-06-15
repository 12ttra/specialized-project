const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  userImage: {
    type: String,
    default: "user.png",
  },
  verified: {
    type: String,
    default: false,
  },
  secretKey: {
    type: String,
    default: null,
  },
  history: {
    type: Array,
    default: [],
  },
},
{ timestamps: true }
);

// encrypt the password before storing
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (candidatePassword) {
  if (this.password != null) {
    return bcrypt.compareSync(candidatePassword, this.password);
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
