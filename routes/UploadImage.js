const express = require("express");
const RouterUploadIamge = express.Router();
const uploadImage = require("../controllers/uploadImage")

RouterUploadIamge.route("/").post(uploadImage)

module.exports = RouterUploadIamge;
