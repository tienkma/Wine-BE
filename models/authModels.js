const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authSchemas = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  numberPhone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  roles: {
    type: String,
    enum: ["admin", "user", "employee"],
    default: "user",
  },
});

authSchemas.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

authSchemas.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

authSchemas.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Users", authSchemas);
