const Products = require("../models/productModels");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");

const getProduct = async (req, res) => {
  const product = await Products.findById({
    _id: req.params.id,
  });
  if (!product) {
    return res
      .status(StatusCodes.OK)
      .json({ error: { mgs: `No product by id: ${req.params.id}` } });
  }
  res.status(StatusCodes.OK).json({ product });
};
const postProduct = async (req, res) => {
  const product = await Products.create({
    ...req.body,
  });
  if (!product) {
    return res.status(StatusCodes.OK).json({
      error: { mgs: `Error create product` },
      status: StatusCodes.BAD_REQUEST,
    });
  }
  res.status(StatusCodes.OK).json({ product });
};
const putProduct = async (req, res) => {
  const product = await Products.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    return res.status(StatusCodes.OK).json({
      error: { mgs: `No product by id: ${req.params.id}` },
      status: StatusCodes.BAD_REQUEST,
    });
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const Product = await Products.findByIdAndRemove({
    // createdBy: req.user.userId,
    _id: req.params.id,
  });
  if (!Product) {
    res
      .status(StatusCodes.OK)
      .json({ error: { mgs: `No product by id: ${req.params.id}` } });
  }
  res.status(StatusCodes.OK).json({ Product });
};
const getAllProduct = async (req, res) => {
  const ProductList = await Products.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ ProductList });
};
module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getAllProduct,
};
