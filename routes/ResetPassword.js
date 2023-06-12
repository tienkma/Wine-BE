const express = require("express");
const RouterResetPassword = express.Router();
const sendEmail = require("../controllers/sendEmail");

RouterResetPassword.route("/").post(sendEmail);

module.exports = RouterResetPassword;
