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

RouterProduct.route("/").post(getAllProduct);
RouterProduct.route("/create").post(postProduct);

module.exports = RouterProduct;
