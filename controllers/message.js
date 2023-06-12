const Messages = require("../models/messModels");
const { StatusCodes } = require("http-status-codes");

const createMess = async (req, res) => {
  try {
    const cart = await Messages.create({ ...req.body });
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    throw new Error(error);
  }
};

const getAllMessage = async (req, res) => {
  const messages = await Messages.find({
    createdBy: req.params.id,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({ messages });
};

module.exports = {
  createMess,
  getAllMessage,
};
