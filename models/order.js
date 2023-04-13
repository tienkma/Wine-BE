const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  email: {
    type: String,
    required: true,
  }, 
  cart: {
    type: String,
    required: true,
  },
  createAt: {
    type: String,
    default: `${Date()}`,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [false, "Please provide user"],
  },
});

module.exports = mongoose.model("Orders", orderSchema);
