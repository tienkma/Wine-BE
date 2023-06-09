const { StatusCodes } = require("http-status-codes");
const Users = require("../models/authModels");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const { roles, ...rest } = req.body;
  const user = await Users.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).select({ password: false });
  if (!user) {
    return res.status(200).json({ error: { msg: "Error Update User" } });
  }

  res.status(200).json({ user });
};
const getUser = async (req, res) => {
  const user = await Users.findById({ _id: req.params.id }).select({
    password: false,
  });

  if (!user) {
    return res.status(200).json({ error: { msg: "Error Get User" } });
  }
  return res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const user = await Users.findByIdAndRemove({ _id: req.params.id });
  if (!user) {
    return res.status(200).json({ error: { msg: "Error Delete User" } });
  }
  return res.status(200).json({ user });
};

const getAllUsers = async (req, res) => {
  const users = await Users.find({}).select({ password: false });
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
};
