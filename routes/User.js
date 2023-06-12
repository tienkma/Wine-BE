const express = require("express");
const RouteUser = express.Router();

const {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  changePassword,
} = require("../controllers/users");

RouteUser.route("/").get(getAllUsers);
RouteUser.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = RouteUser;
