const express = require("express");
const RouterOrder = express.Router();

const { createOrder, getListOrder, getOrder } = require("../controllers/order");

RouterOrder.route("/").get(getListOrder)
RouterOrder.route("/user").get(getOrder).post(createOrder);


module.exports = RouterOrder;
