const express = require("express");
const RouterAuth = express.Router();

const {
  login,
  register,
  changePassword,
  resetPassword,
} = require("../controllers/auth");

RouterAuth.route("/login").post(login);
RouterAuth.route("/register").post(register);
RouterAuth.route("/changePassword").post(changePassword);
RouterAuth.route("/resetPassword").post(resetPassword);

module.exports = RouterAuth;
