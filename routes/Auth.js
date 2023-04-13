const express = require("express");
const RouterAuth = express.Router();

const { login, register } = require("../controllers/auth");

RouterAuth.route("/login").post(login);
RouterAuth.route("/register").post(register);


module.exports = RouterAuth;
