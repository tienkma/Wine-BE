const Products = require("../models/productModels");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");

const getProduct = async (req, res) => {
  try {
    const product = await Products.findById({
      _id: req.params.id,
    });
    if (!product) {
      return res
        .status(StatusCodes.OK)
        .json({ error: { mgs: `No product by id: ${req.params.id}` } });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
};
const postProduct = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
};
const putProduct = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProduct = async (req, res) => {
  // const ProductList = await Products.find({}).sort("createdAt");
  try {
    const queryObj = { ...req.query };
    const { filter } = req.body;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Products.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Products.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.status(StatusCodes.OK).json({
      pageItems: product || [],
      pageInfo: {},
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getAllProduct,
};
