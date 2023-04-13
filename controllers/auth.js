const express = require("express");
const Users = require("../models/authModels");
const UnauthenticatedError = require("../errors/unauthenticated");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.OK)
      .json({ error: { msg: "Email Unregistered" } });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.OK)
      .json({ error: { msg: "Invalid Credentials" } });
  }
  const token = user.createJWT();

  const object = {}
  if(user.numberPhone){
    object.numberPhone = user.numberPhone
  }
  if(user.address){
    object.address = user.address
  }
  res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id ,name: user.name, roles: user.roles, ...object }, token });
};

const register = async (req, res) => {
  const findUser = await Users.findOne({ email: req.body.email }).select({password: 0});
  if (findUser) {
    return res
      .status(StatusCodes.OK)
      .json({ error: { msg: "Email already exist!" } });
  }

  const user = await Users.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

module.exports = {
  login,
  register,
};
