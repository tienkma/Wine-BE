const Orders = require("../models/order");
const { StatusCodes } = require("http-status-codes");
const Users = require("../models/authModels");

const getListOrder = async (req, res) => {
  const orders = await Orders.find({});

  res.status(StatusCodes.OK).json({
    orders,
  });
};

const getOrder = async (req, res) => {
  const order = await Orders.find({ email: req.query.email });
  res.status(StatusCodes.OK).json({
    order,
  });
};
const createOrder = async (req, res) => {
  const order = await Orders.create(req.body );
  res.status(StatusCodes.CREATED).json({ order });
};

module.exports = {
  getListOrder,
  getOrder,
  createOrder,
};
