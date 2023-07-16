const express = require("express");
const RouterComment = express.Router();
const { queryComments, createComment } = require("../controllers/comment");
const authMiddleware = require("../middleware/authentication");

RouterComment.route("/query").post(queryComments);
RouterComment.route("/create").post(authMiddleware, createComment);

module.exports = RouterComment;
