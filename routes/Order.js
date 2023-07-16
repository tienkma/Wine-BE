const express = require("express");
const RouterOrder = express.Router();

const {
  createOrder,
  orderQuery,
  getOrder,
  deleteOrder,
} = require("../controllers/order");

RouterOrder.route("/").post(createOrder);
RouterOrder.route("/query").post(orderQuery);

RouterOrder.route("/:id").get(getOrder).delete(deleteOrder);

module.exports = RouterOrder;
