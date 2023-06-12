// const User = require('../models/User')
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({error: {msg: "Authentication invalid"}})
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userID, name: payload.name };
    next();
  } catch (error) {
    return res.status(401).json({error: {msg: "Authentication invalid"}})
  }
};

module.exports = auth;