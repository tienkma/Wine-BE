const Comments = require("../models/commentModels");
const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  try {
    const comment = await Comments.create({
      ...req.body,
      user: req.user,
    });
    if (!comment) {
      return res.status(StatusCodes.OK).json({
        error: { mgs: `Error create comment` },
        status: StatusCodes.BAD_REQUEST,
      });
    }
    res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    throw new Error(error);
  }
};

const queryComments = async (req, res) => {
  try {
    const filter = req.body;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete filter[el]);
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Comments.find(JSON.parse(queryStr));

    // Sorting
    const sortDirection =
      req.body.sortDirection === "asc"
        ? 1
        : req.body.sortDirection === "des"
        ? -1
        : "";
    if (req.query.sort) {
      const sortBy = { createAt: -1, [req.body.sortBy]: sortDirection };
      query = query.sort(sortBy);
    } else {
      query = query.sort({ createAt: -1 });
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    let commentCount = 1;
    if (req.query.page) {
      commentCount = await Comments.countDocuments({
        productId: req.params.id,
        currentId: { $exists: true, $ne: null },
      });
      // if (skip > commentCount) throw new Error("This Page does not exists");
    }
    const comment = await query;
    res.status(StatusCodes.OK).json({
      pageItems: comment || [],
      pageInfo: {
        totalPage: Math.ceil(commentCount / limit),
        page: req.query.page,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createComment,
  queryComments,
};
