const Orders = require("../models/order");
const { StatusCodes } = require("http-status-codes");
const Users = require("../models/authModels");

const orderQuery = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const { filter } = req.body;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Orders.find(JSON.parse(queryStr));

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
      const orderCount = await Orders.countDocuments();
      if (skip >= orderCount) throw new Error("This Page does not exists");
    }
    const order = await query;
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    throw new Error(error);
  }
};

const createOrder = async (req, res) => {
  const order = await Orders.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!order) {
      res
        .status(StatusCodes.OK)
        .json({ error: { mgs: `No order by id: ${req.params.id}` } });
    }
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    throw new Error(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Orders.findById({
      _id: req.params.id,
    });
    if (!order) {
      return res
        .status(StatusCodes.OK)
        .json({ error: { mgs: `No order by id: ${req.params.id}` } });
    }
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  orderQuery,
  createOrder,
  getOrder,
  deleteOrder,
};
