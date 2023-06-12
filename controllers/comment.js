const Comments = require("../models/commentModels");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  try {
    const comment = await Comments.create({
      ...req.body,
    });
    if (!comment) {
      return res.status(StatusCodes.OK).json({
        error: { mgs: `Error create comment` },
        status: StatusCodes.BAD_REQUEST,
      });
    }
    res.status(StatusCodes.OK).json({ comment });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndRemove({
      // createdBy: req.user.userId,
      _id: req.params.id,
    });
    if (!comment) {
      res
        .status(StatusCodes.OK)
        .json({ error: { mgs: `No comment by id: ${req.params.id}` } });
    }
    res.status(StatusCodes.OK).json({ comment });
  } catch (error) {
    throw new Error(error);
  }
};

const getAllComment = async (req, res) => {
  // const commentList = await Comments.find({}).sort("createdAt");
  try {
    const queryObj = { ...req.query };
    const { filter } = req.body;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Comments.find({
      productId: req.params.id,
      currentId: { $exists: true, $ne: null },
    });

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
      const commentCount = await Comments.countDocuments({
        productId: req.params.id,
        currentId: { $exists: true, $ne: null },
      });
      if (skip >= commentCount) throw new Error("This Page does not exists");
    }
    const comment = await query;
    res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createComment,
  deleteComment,
  getAllComment,
};
