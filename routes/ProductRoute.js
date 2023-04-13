const express = require("express");
const RouterProduct = express.Router();
const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/products");

RouterProduct.route("/:id")
  .get(getProduct)
  .put(putProduct)
  .delete(deleteProduct);

RouterProduct.route("/").get(getAllProduct).post(postProduct);

module.exports = RouterProduct;
