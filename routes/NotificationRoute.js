const express = require("express");
const RouterNotification = express.Router();

const {
  createNotidication,
  getAllNotidication,
} = require("../controllers/notification");

RouterNotification.route("/").get(getAllNotidication);

RouterNotification.route("/query").post(createNotidication);

module.exports = RouterNotification;
