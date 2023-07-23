const Orders = require("../models/order");
const { StatusCodes } = require("http-status-codes");
const Users = require("../models/authModels");

const orderQuery = async (req, res) => {
  try {
    const filter = { ...(req.body || {}), createdBy: req.user.userId };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete filter[el]);
    console.log("filter", filter);
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Orders.find(JSON.parse(queryStr));

    // Sorting

    const sortDirection =
      req.body.sortDirection === "asc"
        ? 1
        : req.body.sortDirection === "des"
        ? -1
        : "";

    if (req.query.sort) {
      const sortBy = { createdAt: -1, [req.body.sortBy]: sortDirection };
      query = query.sort(sortBy);
    } else {
      query = query.sort({ createdAt: -1 });
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
    let orderCount = 1;

    if (req.query.page) {
      orderCount = await Orders.countDocuments(JSON.parse(queryStr));
      if (skip > orderCount) throw new Error("This Page does not exists");
    }

    const order = await query;

    res.status(StatusCodes.OK).json({
      pageItems: order || [],
      pageInfo: {
        totalPage: Math.ceil(orderCount / limit),
        page: req.query.page,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const createOrder = async (req, res) => {
  const order = await Orders.create({
    ...req.body,
    email: "tien@gmail.com",
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json(order);
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndRemove({
      createdBy: req.params.id,
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
      createdBy: req.params.id,
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
