const express = require("express");
const RouteCart = express.Router();

const {
  postCart,
  putCart,
  deleteCart,
  getAllCart,
  removeCart
} = require("../controllers/carts");

RouteCart.route("/").delete(removeCart);
RouteCart.route("/:id").post(postCart).put(putCart).delete(deleteCart).get(getAllCart);

module.exports = RouteCart;
