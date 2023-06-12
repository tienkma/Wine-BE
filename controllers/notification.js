const Notifications = require("../models/notificationModels");
const { StatusCodes } = require("http-status-codes");

const createNotidication = async (req, res) => {
  try {
    const cart = await Notifications.create({ ...req.body });
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    throw new Error(error);
  }
};

const getAllNotidication = async (req, res) => {
  const messages = await Notifications.find({
    createdBy: req.params.id,
  }).sort("createdAt");

  res.status(StatusCodes.OK).json({ messages });
};

module.exports = {
  createMess,
  getAllMessage,
};
