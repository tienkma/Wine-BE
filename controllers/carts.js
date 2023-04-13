const Carts = require("../models/cartModels");
const { StatusCodes } = require("http-status-codes");

const postCart = async (req, res) => {
  const cart = await Carts.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ cart });
};

const putCart = async (req, res) => {
  const cart = await Carts.findByIdAndUpdate(
    {
      createdBy: req.user.userId,
      _id: req.params.id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!cart) {
    return res.status(StatusCodes.OK).json({
      error: { mgs: `Error update Cart` },
      status: StatusCodes.BAD_REQUEST,
    });
  }
  res.status(StatusCodes.OK).json({ cart });
};
const deleteCart = async (req, res) => {
  const Product = await Carts.findByIdAndDelete({
    createdBy: req.user.userId,
    _id: req.params.id,
  });
  if (!Product) {
    return res
      .status(StatusCodes.OK)
      .json({ error: { mgs: `Error delete cart` } });
  }
  res.status(StatusCodes.OK).json({ deleteCart: "deleteCart" });
};
const getAllCart = async (req, res) => {
  const carts = await Carts.find({
    createdBy: req.params.id,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({ carts });
};
const removeCart = async (req, res) => {
  const cart = await Carts.deleteMany({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ cart });
};
module.exports = {
  postCart,
  putCart,
  deleteCart,
  getAllCart,
  removeCart,
};
